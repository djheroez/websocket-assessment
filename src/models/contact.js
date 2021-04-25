import merge from "lodash/merge";

const NAMESPACE = "contacts";

const list = async () => {
  const contacts = (await redisClient.getAsync(NAMESPACE)) || "[]";

  return JSON.parse(contacts);
};

const add = async contact => {
  const contacts = await list();

  contacts.push(contact);

  const result = await redisClient.setAsync(
    NAMESPACE,
    JSON.stringify(contacts)
  );

  return result;
};

const get = async email => {
  const contacts = await list();

  return contacts.find(contact => contact.email === email);
};

const update = async (email, data) => {
  const contact = await get(email);

  const contacts = await list();

  const updatedContacts = contacts.filter(contact => contact.email !== email);

  updatedContacts.push(merge(contact, data));

  const result = await redisClient.setAsync(
    NAMESPACE,
    JSON.stringify(updatedContacts)
  );

  return result;
};

const deleteMethod = async email => {
  const contacts = await list();

  const updatedContacts = contacts.filter(contact => contact.email !== email);

  const result = await redisClient.setAsync(
    NAMESPACE,
    JSON.stringify(updatedContacts)
  );

  return result;
};

export default () => ({ add, delete: deleteMethod, get, list, update });
