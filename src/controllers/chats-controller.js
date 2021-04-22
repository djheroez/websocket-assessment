import groupBy from "lodash/groupBy";

import Chat from "../models/chat";

export const getChats = async (request, response) => {
  const chat = Chat();

  const chats = await chat.list();

  response.json(chats);
};

export const getChat = async (request, response) => {
  const chat = Chat();

  const chats = await chat.list();

  response.render("chat/index", { chats })
};