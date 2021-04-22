import jq from "jquery";

import { MESSAGE_TYPES } from "../message-handlers/constants";

import { showError, showSuccess } from "./alerts";
import { renderContacts, setNewContactFields } from "./utils";

const newFormHandler = () => {
   jq("form").on("submit", event => {
    event.preventDefault();

    const name = jq("#name").val();
    const email = jq("#email").val();

    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "create_contact", data: { name, email } })
    );
  });
}

const editFormHandler = () => {
  jq("form#find-form").on("submit", event => {
    event.preventDefault();

    const contact = jq("#email").val();

    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "get_contact", contact })
    );
  });

  jq("form#edit-form").on("submit", event => {
    event.preventDefault();

    const name = jq("#new-name").val();
    const email = jq("#new-email").val();
    const contact = jq("#email").val();

    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "update_contact", contact, data: { name, email } })
    );
  });
}

const deleteFormHandler = () => {
   jq("form").on("submit", event => {
    event.preventDefault();

    const contact = jq("#email").val();

    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "delete_contact", contact })
    );
  });
}

const messageHandler = message => {
  if (message.status === "success") {
    switch(message.type) {
      case MESSAGE_TYPES.CREATE_CONTACT:
      case MESSAGE_TYPES.UPDATE_CONTACT:
      case MESSAGE_TYPES.DELETE_CONTACT: {
        showSuccess("Changes saved successfully");
        renderContacts();
      } break;
      case MESSAGE_TYPES.GET_CONTACT: {
        setNewContactFields(message.data);
      } break;
      default:
        return null;
    }
  } else {
    showError("An error was found");
  }
}

export default () => ({
  deleteFormHandler,
  editFormHandler,
  messageHandler,
  newFormHandler
});
