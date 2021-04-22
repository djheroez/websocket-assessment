import Chat from "../models/chat";

import { MESSAGE_TYPES } from "./constants";

const addChat = async (websocket, message) => {
  const chatModel = Chat();

  const messageData = { ...message.data, date: new Date().toJSON() };

  const result = await chatModel.add(messageData);

  websocket.send(
    JSON.stringify({ type: MESSAGE_TYPES.ADD_CHAT, status: "success", data: messageData })
  );
};

export default ({ addChat });
