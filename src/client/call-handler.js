import stunConfig from "../../stun.config.json";

import { showError } from "./alerts";

const getVideoElemForUser = user =>
  document.getElementById(user === "user_1" ? "video-1" : "video-2");

const gotRemoteStream = (event, remoteVideo) => {
  if (remoteVideo.srcObject !== event.streams[0]) {
    remoteVideo.srcObject = event.streams[0];
  }
};

const createRTCPeerConnection = () => {
  const currentConfig = stunConfig || {
    iceServers: [
      {
        urls: "stun:stun.l.google.com"
      }
    ]
  };
  const peerConnection = new RTCPeerConnection(currentConfig);

  return peerConnection;
};

export const callAnswer = async ({ offer, from, to }) => {
  try {
    const peer = WebSocketClient.peers.remote;

    await peer.setRemoteDescription(offer);

    const answer = await peer.createAnswer();

    await peer.setLocalDescription(answer);

    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "call_answer", answer, from: to, to: from })
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleIceCandidate = async ({ candidate, from, to }) => {
  try {
    const peer = from
      ? WebSocketClient.peers.remote
      : WebSocketClient.peers.local;

    await peer.addIceCandidate(candidate);
  } catch (error) {
    console.log(error);
  }
};

export const handleCallAnswer = async data => {
  await WebSocketClient.peers.local.setRemoteDescription(data.answer);
};

export const start = async videoElem => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });

    videoElem.srcObject = stream;

    return stream;
  } catch (e) {
    console.error(e);
    showError(`getUserMedia() error: ${e.name}`);
  }
};

export const hangup = () => {
  WebSocketClient.peers.local.close();
  WebSocketClient.peers.remote.close();

  const videos = Array.prototype.slice.call(
    document.getElementsByTagName("video")
  );
  const streams = videos
    .map(video => video.srcObject)
    .flatMap(stream => (stream ? stream.getTracks() : []))
    .forEach(track => track.stop());

  videos.forEach(video => {
    video.srcObject = null;
  });
};

export const startCall = async (from, to) => {
  try {
    const videoElem = getVideoElemForUser(from);
    const localPeer = createRTCPeerConnection();
    const remotePeer = createRTCPeerConnection();

    WebSocketClient.peers = { local: localPeer, remote: remotePeer };

    const stream = await start(videoElem);

    stream.getTracks().forEach(track => localPeer.addTrack(track, stream));

    const offer = await localPeer.createOffer({
      offerToReceiveAudio: 1,
      offerToReceiveVideo: 1
    });

    await localPeer.setLocalDescription(offer);

    localPeer.onicecandidate = event => {
      if (event.candidate) {
        WebSocketClient.webSocket.send(
          JSON.stringify({
            type: "ice_candidate",
            from,
            candidate: event.candidate
          })
        );
      }
    };
    remotePeer.addEventListener("track", event =>
      gotRemoteStream(event, getVideoElemForUser(to))
    );

    remotePeer.onicecandidate = event => {
      if (event.candidate) {
        WebSocketClient.webSocket.send(
          JSON.stringify({
            type: "ice_candidate",
            to,
            candidate: event.candidate
          })
        );
      }
    };

    WebSocketClient.webSocket.send(
      JSON.stringify({ type: "call_offer", offer, from, to })
    );
  } catch (error) {
    console.log(error);
  }
};
