import Route from "./route";
import { Request, Response, NextFunction } from "express";
import express = require('express');
import path = require('path');
import { Server } from "socket.io";
import RoomManager from "../sockets/RoomManager";

export default class PlayRouter extends Route {
    roomManager!: RoomManager;

    constructor() {
        super();
        this.createGame();
        this.play()
        
        console.log('created')
    }
    play(): void {
        this.router.get('/:id', (req:Request, res:Response, next:NextFunction) => {
            res.sendFile(path.join(__dirname, '../frontend/play.html'))
        })
    }
    createGame(): void {
        this.router.get('/createGame', (req:Request, res:Response, next:NextFunction) => {
            //generate Room ID
            //Set Up sockets connection
            //reroute to play/id
            console.log('create game')
            res.sendFile(path.join(__dirname, '../frontend/play.html'))
        })
        console.log('create game method')
    }
    setRoomManager(manager: RoomManager) {
        this.roomManager = manager
    }
    

}