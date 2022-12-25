import Route from './route.js'
import { Request, Response, NextFunction } from "express";
import express from 'express';

import path from 'path'
const __dirname: string = path.resolve();

export default class RedirectRouter extends Route {

    
    constructor() {
        super();
        this.get()
        this.test()
        const publicFunc = () => {
            console.log("publicFunction")
        } 

        
        this.use('.../public', publicFunc)
        this.use(path.join(__dirname, 'dist/frontend'), publicFunc)
    }
    get() {
       this.router.get('/', (req:Request, res:Response, next:NextFunction) => {

            res.sendFile(path.join(__dirname, 'public/index.html'))
        })
    }
     
     test() {
         this.router.get('/test', (req:Request, res:Response, next:NextFunction) => {
             console.log("test")
             res.send("23")
         })
     }
}