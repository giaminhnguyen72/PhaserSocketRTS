import { Position } from "../physics/transformType.js"

export interface Shape {
    pos: Position
}
export interface Rectangle extends Shape {
    pos: Position
    rot: number
    dim: {length:number, height: number}


    
}
export interface Circle extends Shape {
    pos: Position
    radius: number
}
export interface Polygon extends Shape {
    pts: number[]
    pos: Position
    rot: number

}
export interface Click extends Shape {
    pos:Position

}