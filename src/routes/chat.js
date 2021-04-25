import express from "express";

import { getChat, getChats } from "../controllers/chats-controller";

export default () => {
  const router = express.Router();

  router.get("/current", getChat);
  router.get("/", getChats);

  return router;
};
