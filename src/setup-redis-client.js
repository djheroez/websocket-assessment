import redis from "redis";
import { promisify } from "util";

const withPromises = client => {
  client.getAsync = promisify(client.get).bind(client);
  client.setAsync = promisify(client.set).bind(client);

  return client;
}

export default () => {
  const client = redis.createClient({
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1"
  });

  return withPromises(client);
};
