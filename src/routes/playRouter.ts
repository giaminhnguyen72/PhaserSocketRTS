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
        this.router.use("/:id", (req: Request, res: Response, next: NextFunction) => {
            console.log("test")
            
        }) 
        
        this.rooms = rooms
        
        console.log('created')
    }
    play(): void {
        //for spectator mode
        this.router.get('/:id', (req:Request, res:Response, next:NextFunction) => {
            let id: number= parseInt(req.params.id)
            if (this.rooms?.rooms.has(id)) {
                console.log("Get")

                res.sendFile(path.join(__dirname, 'public/engine.html'))
            } else {
                res.redirect('../')
            }
            
        })
        //for joining a game
        this.router.post('/:id', (req:Request, res:Response, next:NextFunction) => {
            let id: number= parseInt(req.params.id)
            console.log("Request:" + req.body.roomID)
            if (req.body.roomID != undefined) {
                id = parseInt(req.body.roomID)
                console.log("Inside if " + id)
            }
            console.log("ID1 " + id)

            if (!validateName(req.body.playerName)) {
                //res.redirect('../')
            }
            let playerName: string = req.body.playerName
            playerName = playerName.trim()
            if (this.rooms?.rooms.has(id)) {
                console.log("Post 32432")
                
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
            console.log('create game20')
            res.status(404).send("lol fail")
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