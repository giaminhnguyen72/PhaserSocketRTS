
import { Player } from 'Player.js'
import Phaser from 'phaser';
import {io, Socket} from 'socket.io-client'



export class WaitingScene extends Phaser.Scene {
    socket: Socket;
    playerMap: Map<number, string>
    constructor(socket: Socket) {
        super({
            key: "WaitingScene"
        })
        this.socket = socket
        this.playerMap = new Map<number, string>()
    }
    preload(): void {
        var count = 0
        var socket = this.socket
        socket.emit("GetPlayers", () => {

        })
        socket.on("playerAdded", (playerName: string, clientId: number) => {
            this.addPlayer(clientId, playerName)
            var playerInfo  = " PlayerName: " + playerName + "          PlayerID: "+ clientId
            this.add.text(100, 100 + count * 10, playerInfo)

            count++
            console.log("Player has been added")
        })
        
        this.add.text(0,0,"Waiting Stuff")
        this.add.text(0, 200, "" + window.location.pathname)
        this.createPlayerList()

        
        
    }
    create(): void {

        

    }
    addPlayer(clientId: number, playerName: string) {
        this.playerMap.set(clientId, playerName)
    }
    createPlayerList(): void {
        var styles: Object = {
            
        }
        var ul: Phaser.GameObjects.DOMElement = this.add.dom(100, 100, "div", 'display: flex; flex-direction: column; height: 500px; width: 200px; justify-content: center; background-color: red; align-self: center; align-items: center;')
        ul.depth = 1
        ul.setClassName("ul")
        /**
         * var list = document.getElementsByClassName("ul")[0]
        
        var listItem = document.createElement("li")
        listItem.appendChild(document.createTextNode("test"))
        list.appendChild(listItem)
         * 
         * 
         */
        //var childElement: Phaser.GameObjects.DOMElement = new Phaser.GameObjects.DOMElement(this, undefined, undefined, 'li',"background-color: blue", "Test")
        //ul.createFromHTML("<li>test</li>")

        

    }

}