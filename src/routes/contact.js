import express from "express";

import {
  deleteContact,
  editContact,
  getContacts,
  newContact
} from "../controllers/contacts-controller";

export default () => {
  const router = express.Router();

  router.get("/", getContacts);
  router.get("/new", newContact);
  router.get("/edit", editContact);
  router.get("/delete", deleteContact);

  return router;
};
