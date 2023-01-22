import { Socket } from "socket.io-client";
import { EventHandler } from "../../events/EventHandler.js";

export interface SocketManager {
    io: Socket
    new (e: EventHandler): SocketManager
}