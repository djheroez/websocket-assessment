import { MESSAGE_TYPES } from "./constants";

const callOffer = async (websocket, message) => {
  const { offer, from, to } = message;

  websocket.send(
    JSON.stringify({
      type: MESSAGE_TYPES.CALL_OFFER,
      status: "success",
      offer,
      from,
      to
    })
  );
};

const callAnswer = async (websocket, message) => {
  const { answer, from, to } = message;

  websocket.send(
    JSON.stringify({
      type: MESSAGE_TYPES.CALL_ANSWER,
      status: "success",
      answer,
      from,
      to
    })
  );
};

const iceCandidate = async (websocket, message) => {
  const { candidate, from, to } = message;

  websocket.send(
    JSON.stringify({
      type: MESSAGE_TYPES.ICE_CANDIDATE,
      status: "success",
      candidate,
      from,
      to
    })
  );
};

export default { callAnswer, callOffer, iceCandidate };
