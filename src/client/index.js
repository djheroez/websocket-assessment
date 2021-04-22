import "bootstrap";
import './styles/main.scss';

import BuildWebSocket from "./build-web-socket";

export { default as ContactForm } from "./contact-form"
export { default as ChatForm } from "./chat-form"

export const webSocket = BuildWebSocket();
