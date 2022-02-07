interface Player {
    id: string
    clientId: number
    roomId: string
}
class DungeonMaster  implements Player {
    id: string
    clientId: number
    roomId: string
    constructor(id: string, clientId: number, roomId: string) {
        this.id = id
        this.clientId = clientId
        this.roomId = roomId

    }
}
class Character  implements Player {
    id: string
    clientId: number
    roomId: string
    constructor(id: string, clientId: number, roomId: string) {
        this.id = id
        this.clientId = clientId
        this.roomId = roomId
    }
}