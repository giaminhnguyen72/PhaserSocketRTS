import { Router } from "express";
import express from "express";

export default class Route {
    router: Router
    
    constructor() {
        this.router = express.Router()

    }
    use(URI:string, func: () => void): void {
        this.router.use(URI, func);
    } 
    getRouter(): Router {
        return this.router
    }
    get(URI: string, ...func: (() => any)[]): void {
            for (let i:number = 0; i < func.length; i++) {
                func;
            }
            this.router.get(URI, func)
    } 
    getKey(URI: string, validationKey:string, ...func: (() => any)[]): void {
        for (let i:number = 0; i < func.length; i++) {
            func;
        }
        this.router.get(URI, func)
    }
    post(URI: string, ...func: (() => any)[]): void {
        for (let i:number = 0; i < func.length; i++) {
            func;
        }
        this.router.get(URI, func)
    } 
    postKey(URI: string, validationKey:string, ...func: (() => any)[]): void {
        for (let i:number = 0; i < func.length; i++) {
            func;
        }
        this.router.post(URI, func)
    }
    delete(URI: string, ...func: (() => any)[]): void {
        for (let i:number = 0; i < func.length; i++) {
            func;
        }
        this.router.get(URI, func)
    } 
    deleteKey(URI: string, validationKey:string, ...func: (() => any)[]): void {
        for (let i:number = 0; i < func.length; i++) {
            func;
        }
        this.router.get(URI, func)
    }
}