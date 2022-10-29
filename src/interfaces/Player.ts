import { Socket } from "socket.io-client"

export interface Player {
    name: string,
    clientId: number
    roomId: number
    socket?: Socket
}
export class DungeonMaster  implements Player {
    name: string
    clientId: number
    roomId: number
    socket?: Socket
    constructor(id: string, clientId: number, roomId: number, socket?:Socket) {
        this.name = id
        this.clientId = clientId
        this.roomId = roomId
        this.socket = socket
    }
}
/**
 * 
 
export class Character  implements Player {
    name: string
    clientId: number
    roomId: number
    socket?: Socket
    constructor(id: number, clientId: number, roomId: string, socket?: Socket) {
        this.name = id
        this.clientId = clientId
        this.roomId = roomId
    }
}
**/