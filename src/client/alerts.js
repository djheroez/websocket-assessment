import jq from "jquery";

const removeHiddenAlerts = () => {
  jq('.toast').on('hidden.bs.toast', () => {
    jq("div.alerts .toast.hide").remove();
  });
}

export const showAlert = (message, type) => {
  const template = jq("template#alert").clone().html();
  jq("div.alerts").append(template);
  jq("div.alerts span.text:last").text(message)

  jq("div.alerts .toast-header:last").addClass(type)

  const jqToast = jq(".toast");
  jqToast.toast({ delay: 3000 });
  jqToast.toast("show");

  removeHiddenAlerts();
}

export const showSuccess = message => showAlert(message, "success");

export const showError = message => showAlert(message, "error");
