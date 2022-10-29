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
        this.use('.../public', ()=> {
            console.log("hello")
        })
        this.use(path.join(__dirname, 'public'), () => {
            console.log("Hello")
        })
        console.log('created')
    }
    play(): void {
        //for spectator mode
        this.router.get('/:id', (req:Request, res:Response, next:NextFunction) => {
            var id: number= parseInt(req.params.id)
            if (this.rooms?.rooms.has(id)) {
                res.sendFile(path.join(__dirname, 'public/play.html'))
            } else {
                res.redirect('../')
            }
            
        })
        //for joining a game
        this.router.post('/:id', (req:Request, res:Response, next:NextFunction) => {
            var id: number= parseInt(req.params.id)
            if (!validateName(req.body.playerName)) {
                res.redirect('../')
            }
            var playerName: string = req.body.playerName
            playerName = playerName.trim()
            if (this.rooms?.rooms.has(id)) {
                console.log("Post 32432")
                res.sendFile(path.join(__dirname, 'public/play.html'))
                this.rooms.addPlayer(playerName, id)
                
            } else {
                res.redirect('../')
            }
            
        })
    }
    createGame(): void {
        /**
         * 
         
        this.router.get('/createGame', (req:Request, res:Response, next:NextFunction) => {
            //generate Room ID
            //Set Up sockets connection
            //reroute to play/id
            console.log('create game')
            res.sendFile(path.join(__dirname, 'public/play.html'))
        })
        */
        this.router.post('/createGame', (req:Request, res: Response) => {
            var gameName: string = req.body.gameName
            var playerName: string = req.body.playerName
            var URI: string = '/play'
            gameName = gameName.trim()
            playerName = playerName.trim()

            
            if (validateRoomName(gameName) && validateName(playerName)) {

                var room = this.rooms?.addRoom(gameName)

                
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