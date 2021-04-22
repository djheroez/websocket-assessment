import jq from "jquery";

import { MESSAGE_TYPES } from "../message-handlers/constants";

import {
  callAnswer,
  handleCallAnswer,
  handleIceCandidate,
  startCall,
  hangup
} from "./call-handler";
import { renderMessage } from "./utils";

const onSubmitForm = (event, jqForm) => {
  event.preventDefault();

  const message = jqForm.find("input[name='message']").val();
  const user = jqForm.find("input[name='user']").val();

  jqForm.find("input[name='message']").val("");

  if (message) {
    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "add_chat", data: { user, message } })
    );
  }
}

const toggleCallButtons = (jqButton1, jqButton2) => {
  jqButton1.prop("disabled", !jqButton1.prop("disabled"));
  jqButton2.prop("disabled", !jqButton2.prop("disabled"));
}

const chatFormHandler = () => {
  const jqForm1 = jq("form#chat-form-1");
  const jqForm2 = jq("form#chat-form-2");

  jqForm1.on("submit", event => onSubmitForm(event, jqForm1));
  jqForm2.on("submit", event => onSubmitForm(event, jqForm2));

  const jqButtonCall1 = jq("button#call-1");
  const jqButtonCall2 = jq("button#call-2");

  jqButtonCall1.on("click", () => {
    startCall("user_1", "user_2");
    toggleCallButtons(jqButtonCall1, jqButtonCall2);
  });

  jqButtonCall2.on("click", () => {
    startCall("user_2", "user_1");
    toggleCallButtons(jqButtonCall1, jqButtonCall2);
  });

  jq("button#hangup-1").on("click", () => {
    hangup();
    toggleCallButtons(jqButtonCall1, jqButtonCall2);
  });

  jq("button#hangup-2").on("click", () => {
    hangup();
    toggleCallButtons(jqButtonCall1, jqButtonCall2);
  });
}

const messageHandler = message => {
  if (message.status === "success") {
    switch(message.type) {
      case MESSAGE_TYPES.ADD_CHAT:{
        renderMessage(message.data);
      } break;
      case MESSAGE_TYPES.CALL_OFFER: {
        callAnswer(message);
      } break;
      case MESSAGE_TYPES.CALL_ANSWER: {
        handleCallAnswer(message);
      } break;
      case MESSAGE_TYPES.ICE_CANDIDATE: {
        handleIceCandidate(message);
      } break;
      default:
        return null;
    }
  } else {
    showError("An error was found");
  }
}

export default () => ({ chatFormHandler, messageHandler });
