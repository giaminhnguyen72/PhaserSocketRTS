
import { Server, Socket } from "socket.io";

import { EventHandler } from "../../systems/events/EventHandler.js";
import { Component, Listenable } from "../../types/components.js";
import { EntityPacket } from "../../types/Entity.js";
import { System } from "../../types/system.js";
import { EventConfig, SocketServerConfig } from "../config.js";
import { Scene } from "../scene.js";
import { SceneManager } from "./SceneManager.js";
import { SocketManager } from "./SocketManager.js";

export class SocketServerManager implements System<Listenable>{
    static socket: Server
    roomID?: string
    sceneManager: SceneManager
    tag: string = "EVENTHANDLER";
    components: Map<number, Listenable>;

    events: string[]
    deleted: Component[] = []
    constructor(sceneManager: SceneManager, config: SocketServerConfig) {
        this.components = new Map<number, Listenable>()
        this.events = []
        

        this.sceneManager = sceneManager
        if (config.roomId) {
            this.roomID = config.roomId
        }
        console.log("new Socket server has been madde " + this.roomID)
        console.log("new Socket server has been madde "+ this.roomID) 
        console.log("new Socket server has been madde " + this.roomID)
        console.log("new Socket server has been madde "+ this.roomID)
        if (!SocketServerManager.socket) {
            
            if (config.server) {
                SocketServerManager.socket = config.server
            
            } else {
                SocketServerManager.socket = new Server(3000)
            }
            
            
        }
        Object.entries(config.socketEventMap).map(([k, v]) => {
            console.log("Inside event Map entry parser "+ this.roomID)
    console.log()
            let func = (socket:Socket) => { v(this.roomID as string, this.events, socket)}
            SocketServerManager.socket.on(k, func)
        })
        
        
        
        
    }
    register(comp: Listenable): void {
        if (comp.componentId == undefined || comp.componentId == null) {
            let id = SceneManager.getUniqueComponentId()
            comp.componentId = id
            comp.system = this
            this.components.set(id, comp)
        }
    }
    unregister(comp: number): void {
       let deleted = this.components.get(comp) 
       if (deleted) {
            deleted.alive = false

            this.deleted.push(deleted)
            
       }
    }
    

    update(dt: number): void {

        var len = this.components.size

        let keys = [...this.components.keys()]
        for (var comp of keys) {
            

            var listenable: Listenable = this.components.get(comp) as Listenable
            var eventMap = listenable.eventMap
            for (var e of this.events) {
                if (eventMap) {
                    var func = eventMap.get(e)
                    if (func) {
                        func()

                    }
                }

            }
            
            listenable.update(dt)
        }
        while (this.deleted.length > 0 ) {
            let comp = this.deleted.pop()
            this.components.delete(comp?.componentId as number)
            
        }
        this.events = []
        console.log("RoomId is " + this.roomID)
        if (this.roomID) {
            console.log("updating room" + this.roomID)
            let entities: EntityPacket[] = []

            let ent =  this.sceneManager.getCurrentScene().entities
            console.log(ent.size + " entities have been sent")
            for (let e of  ent){
                let scene = e[1].scene as Scene
                entities.push({
                    components: e[1].components,
                    id: e[1].id as number,
                    sceneId: scene.name,
                    entityClass: e[1].className
                    
                    
                })


            }
            SocketServerManager.socket.to(this.roomID).emit("update", entities)
        }
        
        console.log("Server Socket Components:"+this.components.size)
    }
    
}
function createServer() {
    return new Server()
}