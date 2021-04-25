import Contact from "../models/contact";

import { MESSAGE_TYPES } from "./constants";

const createContact = async (websocket, message) => {
  const contactModel = Contact();

  const success = await contactModel.add(message.data);

  websocket.send(
    JSON.stringify({
      type: MESSAGE_TYPES.CREATE_CONTACT,
      status: "success",
      data: {}
    })
  );
};

const getContact = async (websocket, message) => {
  const contactModel = Contact();

  const data = await contactModel.get(message.contact);
  const status = data ? "success" : "not_found";

  websocket.send(
    JSON.stringify({ type: MESSAGE_TYPES.GET_CONTACT, status, data })
  );
};

const updateContact = async (websocket, message) => {
  const contactModel = Contact();

  const data = await contactModel.update(message.contact, message.data);

  const status = data ? "success" : "not_found";

  websocket.send(
    JSON.stringify({ type: MESSAGE_TYPES.UPDATE_CONTACT, status, data })
  );
};

const deleteContact = async (websocket, message) => {
  const contactModel = Contact();

  const data = await contactModel.delete(message.contact);

  const status = data ? "success" : "not_found";

  websocket.send(
    JSON.stringify({ type: MESSAGE_TYPES.DELETE_CONTACT, status, data })
  );
};

export default {
  createContact,
  getContact,
  updateContact,
  deleteContact
};
