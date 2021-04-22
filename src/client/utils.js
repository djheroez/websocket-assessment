import jq from "jquery";
import groupBy from "lodash/groupBy";

import { PATHS } from "./constants";

export const renderContacts = () => {
  jq.get(PATHS.CONTACTS).then(responseData => {
    jq(".list-group").empty();
    responseData.forEach(contact => {
      jq(".list-group").append(
        `<li class="list-group-item"> Name: ${contact.name}, Email: ${contact.email}</li>`
      );
    })
  });
};

export const setNewContactFields = data => {
  const { name, email } = data || {}
  jq("form#edit-form fieldset").removeAttr("disabled");
  jq("#new-name").val(name);
  jq("#new-email").val(email);
};

export const renderMessage = chat => {
  const template = jq("template#message").clone().html();

  jq("#conversation-1").append(template);
  jq("#conversation-1 .message:last").addClass(chat.user === "user_1" ? "owner" : "friend");
  jq("#conversation-1 .message:last span.date").text(chat.date)
  jq("#conversation-1 .message:last span.text").text(chat.message);

  jq("#conversation-2").append(template);
  jq("#conversation-2 .message:last").addClass(chat.user === "user_2" ? "owner" : "friend");
  jq("#conversation-2 .message:last span.date").text(chat.date)
  jq("#conversation-2 .message:last span.text").text(chat.message);
}
