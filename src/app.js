import express from "express";

import SetupRedisClient from "./setup-redis-client";
import { BaseRouter, ContactRouter, ChatRouter } from "./routes";

export default () => {
  const app = express();
  const port = 3000;

  const redisClient = SetupRedisClient();
  const contactRouter = ContactRouter();
  const baseRouter = BaseRouter();
  const chatRouter = ChatRouter();

  global.redisClient = redisClient;

  app.set("view engine", "ejs");

  app.set("views", `${__dirname}/views`);

  app.use("/", baseRouter);
  app.use("/contacts", contactRouter);
  app.use("/chats", chatRouter);
  app.use(express.static(`${__dirname}/public`));

  app.listen(port);

  return app;
};
