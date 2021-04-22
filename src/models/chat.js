import merge from "lodash/merge";

const NAMESPACE = "chats";

const list = async () => {
  const chats = await redisClient.getAsync(NAMESPACE) || "[]";

  return JSON.parse(chats);
};

const findByUser = async user => {
  const chats = await list();

  if (user) {
    return chats.filter(chat => chat.user === user);
  }

  return [];
}

const add = async chat => {
  const chats = await list();

  chats.push(chat);

  const result = await redisClient.setAsync(NAMESPACE, JSON.stringify(chats));

  return result;
}

export default () => ({ add, findByUser, list });

