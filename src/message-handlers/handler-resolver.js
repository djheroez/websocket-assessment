import { MESSAGE_TYPES } from "./constants";
import ContactHandler from "./contact-handler";
import ChatHandler from "./chat-handler";
import SignalingHandler from "./signaling-handler";

export default type => {
  switch(type) {
    case MESSAGE_TYPES.CREATE_CONTACT:
      return ContactHandler.createContact;
    case MESSAGE_TYPES.DELETE_CONTACT:
      return ContactHandler.deleteContact;
    case MESSAGE_TYPES.GET_CONTACT:
      return ContactHandler.getContact;
    case MESSAGE_TYPES.UPDATE_CONTACT:
      return ContactHandler.updateContact;
    case MESSAGE_TYPES.ADD_CHAT:
      return ChatHandler.addChat;
    case MESSAGE_TYPES.CALL_OFFER:
      return SignalingHandler.callOffer;
    case MESSAGE_TYPES.CALL_ANSWER:
      return SignalingHandler.callAnswer;
    case MESSAGE_TYPES.ICE_CANDIDATE:
      return SignalingHandler.iceCandidate;
    default:
      return null;
  }
};
