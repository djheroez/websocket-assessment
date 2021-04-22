export default message => {
  try {
    return JSON.parse(message);
  } catch (error) {
    return message;
  }
};

