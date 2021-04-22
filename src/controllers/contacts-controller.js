import Contact from "../models/contact";

export const getContacts = async (request, response) => {
  const contact = Contact();

  const contacts = await contact.list();

  response.json(contacts);
};

export const newContact = async (request, response) => {
  const contact = Contact();

  const contacts = await contact.list();

  response.render("contact/new", { contacts })
};

export const editContact = async (request, response) => {
  const contact = Contact();

  const contacts = await contact.list();

  response.render("contact/edit", { contacts })
};

export const updateContact = async (request, response) => {

};

export const deleteContact = async (request, response) => {
  const contact = Contact();

  const contacts = await contact.list();

  response.render("contact/delete", { contacts })
};

