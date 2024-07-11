import Route from "./route.js";
import { Request, Response, NextFunction } from "express";
import path from 'path';
import RoomManager, { Room } from "../sockets/RoomManager.js";
import { validateName, validateRoomName } from "../validators/validateForms.js";
const __dirname = path.resolve();
export default class PlayRouter extends Route {
    rooms?: RoomManager
    constructor(rooms?: RoomManager) {
        super();
        this.createGame();
        this.play()

        
        this.rooms = rooms
        
        console.log('created')
    }
    play(): void {
        this.router.get("/games",(req:Request, res:Response, next:NextFunction) => {
            let roomManager = this.rooms
            if (this.rooms) {
                let packets = []
                for (let i of this.rooms.rooms) {
                    let numOfPlayers = i[1].players.size
                    let roomNumber = i[1].roomID
                    let roomName = i[1].roomName
                    packets.push({
                        "PlayerCount": numOfPlayers,
                        "RoomNumber": roomNumber,
                        "RoomName": roomName
                    })
                }
                res.send(packets)
            } else {
                res.send([])
            }
        })  
        //for spectator mode
        // this.router.get('/:id', (req:Request, res:Response, next:NextFunction) => {
        //     let id: number= parseInt(req.params.id,10)
        //     if (this.rooms?.rooms.has(id)) {
        //         res.cookie("RoomID", id)
        //         res.sendFile(path.join(__dirname, 'public/engine.html'),{}, (error) => {
        //             // Called whenever request completed
        //             // IF completed correctly, error is undefined
        //         } ) 
        //     } else {
        //         res.redirect('../')
        //     }
             
        // })

        //for joining a game
        this.router.post('/:id', (req:Request, res:Response, next:NextFunction) => {
            let id: number= parseInt(req.params.id, 10)
            console.log("Request:" + req.body.roomID)
            if (req.body.roomID != undefined) {
                id = parseInt(req.body.roomID)
            }
            console.log(req.body)

            if (!validateName(req.body.playerName)) {
                //res.redirect('../')
            }
            let playerName: string = req.body.playerName
            console.log(playerName)
            playerName = playerName.trim()
            if (this.rooms?.rooms.has(id)) {

                res.cookie("RoomID", id)
                res.sendFile(path.join(__dirname, 'public/engine.html'), function (err: Error) {
                    if (err) {
                        next(err)
                    } else {
                        console.log("2000000")
                    }
                })
                //this.rooms.addPlayer(playerName, id)
                
            } else {
                res.redirect('../')
                console.log("Failed")
            }
            
        })
        this.router.post("/", (req:Request, res:Response, next:NextFunction) => {
            if (req.body.roomID == undefined) {
                res.redirect("../")
            } else {
                let id: number = parseInt(req.body.roomID)
                let URI: string = '/play'
                res.redirect(307, URI + "/" + id)
            }
            
            
        })
    }
    createGame(): void {

         
        this.router.get('/createGame', (req:Request, res:Response, next:NextFunction) => {
            //generate Room ID
            //Set Up sockets connection
            //reroute to play/id
            res.redirect("../")
        })
        
        
        this.router.post('/createGame', (req:Request, res: Response) => {
            let gameName: string = req.body.gameName
            let playerName: string = req.body.playerName
            let URI: string = '/play'
            gameName = gameName.trim()
            playerName = playerName.trim()

            
            if (validateRoomName(gameName) && validateName(playerName)) {

                let room = this.rooms?.addRoom(gameName)
                console.log(room?.roomID)
                res.redirect(307, URI + '/' + room?.roomID)
            } else {
                console.log("error")
                console.log(gameName)
            }
            
        })
        console.log('create game method')
    }
    setRooms(rooms: RoomManager) {
        this.rooms = rooms
    }
    

    

}