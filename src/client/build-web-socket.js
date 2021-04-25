import { MESSAGE_TYPES } from "../message-handlers/constants";
import messageParser from "../message-handlers/message-parser";

import ContactForm from "./contact-form";
import ChatForm from "./chat-form";
import { DEFAULT_WEB_SOCKET_URL } from "./constants";

export default () => {
  const webSocket = new WebSocket(
    process.env.WEB_SOCKET_URL || DEFAULT_WEB_SOCKET_URL
  );
  const contactForm = ContactForm();
  const chatForm = ChatForm();

  webSocket.onopen = event => {
    console.log("WebSocket ready...");
  };

  webSocket.onmessage = event => {
    const message = messageParser(event.data);

    if (typeof message === "object") {
      switch (message.type) {
        case MESSAGE_TYPES.CREATE_CONTACT:
        case MESSAGE_TYPES.UPDATE_CONTACT:
        case MESSAGE_TYPES.GET_CONTACT:
        case MESSAGE_TYPES.DELETE_CONTACT:
          contactForm.messageHandler(message);
          break;
        case MESSAGE_TYPES.ADD_CHAT:
        case MESSAGE_TYPES.CALL_OFFER:
        case MESSAGE_TYPES.CALL_ANSWER:
        case MESSAGE_TYPES.ICE_CANDIDATE:
          chatForm.messageHandler(message);
          break;
        default:
          console.warn("No handler for this message");
      }
    }
  };

  return webSocket;
};
