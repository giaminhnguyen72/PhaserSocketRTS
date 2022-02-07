import Route from './route'
import { Request, Response, NextFunction } from "express";
import express = require('express');

const path = require('path')


export default class RedirectRouter extends Route {

    
    constructor() {
        super();
        this.get()
        this.test()
        const publicFunc = () => {express.static(path.join(__dirname, '../../public'))} 
        this.use('/public', publicFunc);
        this.use('/frontend', publicFunc)
    }
    get() {
       this.router.get('/', (req:Request, res:Response, next:NextFunction) => {

            res.sendFile(path.join(__dirname, '../frontend/index.html'))
        })
    }
    play() {
        this.router.get('/play', (req:Request, res:Response, next:NextFunction) => {
             res.sendFile(path.join(__dirname, '../frontend/play.html'))
         })
        
     }
     
     test() {
         this.router.get('/test', (req:Request, res:Response, next:NextFunction) => {
             console.log("test")
         })
     }
}