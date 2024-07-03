import { GRAPHICS_TAG } from "../../../../constants/componentType.js";

import { GraphicsEngine } from "../../GraphicEngine.js";


import { OrthographicCamera3d } from "./OrthographicCamera3d.js";


import { Component, Renderable,  } from "../../../../types/components.js";
import { Entity } from "../../../../types/Entity.js";
import { Scene } from "../../../../core/scene.js";
import { Transform } from "../../../physics/components/transform";

import { ContextInfo } from "../../../../core/context.js";
import { getTopX, getTopY, Rectangle } from "../../../..../../../types/components/collision/shape.js";


import { Position } from "../../../../../../engine/src/types/components/physics/transformType.js";
import { System } from "../../../../../../engine/src/types/system.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { SpriteMaterial } from "three/src/materials/SpriteMaterial.js";
import * as THREE from 'three'
import { TextureResource } from "./Texture.js";

type TextureOffset = {
    x: number,
    y: number,
    width: number,
    height: number
}
export class TileSheet3d implements Renderable {
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = GRAPHICS_TAG;
    componentId?: number | undefined;
    system!: GraphicsEngine;
    path: string 
    textureOffsets: TextureOffset[]
    //image width and height
    width: number =0
    height: number = 0
    //cell length in world distances
    cellWidth: number = 0
    cellHeight: number
    spriteMap: number[][]
    meshes: THREE.Mesh[] = []
    // Array of number of columns in each row
    // To get number of rows use numOfStates.length 

    constructor(path: string, rectangle: Rectangle, w: number, h: number, cellWidth: number, cellHeight: number, textureOffset: TextureOffset[]) {
        
        this.path = path
        this.pos = rectangle.pos
        this.shape = rectangle

        this.width = w
        this.height = h
        this.textureOffsets = textureOffset
        this.cellHeight = cellHeight
        this.cellWidth = cellWidth
        
        let arrWidth = Math.ceil(this.shape.dim.length / this.cellWidth)
        let arrHeight = Math.ceil(this.shape.dim.height / this.cellHeight)
        let arr: number[][] = []
        for (let i = 0; i < arrHeight; i++) {
            let row = new Array(arrWidth).fill(0)
            arr.push(row)
        }
        this.spriteMap = arr
        
        
    }
    addTexture(...tile: TextureOffset[]) {
        for (let i of tile) {
            this.textureOffsets.push(i)
        }
        
    }
    setTile(x: number, y:number, val: number) {
        this.spriteMap[y][x] = val
    }
    unmount(): void {
        for (let i of this.sprite) {
            this.system.sceneGraph.remove(i)
        }
    }
    loaded: boolean  = false
    context!: ContextInfo;
    rendered: boolean= false;
    pos: Position;
    shape:Rectangle
    sprite: THREE.Mesh[] = []
    material!:SpriteMaterial
    render(cam: OrthographicCamera3d): void {

    }
    setTexture(x: number, y:number, textureIDX: number) {
        this.spriteMap[y][x] = textureIDX
    }

    initialize(graphics: GraphicsEngine): void {
        




        let w = graphics.sceneManager.loadResource<TextureResource>(TextureResource, this.path)
        if (w) {

            for (let r = 0; r < this.spriteMap.length; r++) {
                for (let c = 0; c < this.spriteMap[r].length; c++) {



                    let tileInfo = this.textureOffsets[this.spriteMap[r][c]]
                    let texture = w.clone()
                    texture.offset.setX(tileInfo.x)
                    texture.offset.setY(tileInfo.y)
                    texture.repeat.set(tileInfo.width/this.width, tileInfo.height/this.height)
                    texture.magFilter = THREE.NearestFilter
                    texture.colorSpace = THREE.SRGBColorSpace

                    let  material = graphics.sceneManager.load<THREE.MeshBasicMaterial>(THREE.MeshBasicMaterial,"TileSetMaterial")
                    if (material == undefined) {
                        material = new THREE.MeshBasicMaterial({map: texture, toneMapped:false, fog: false})
                        graphics.sceneManager.addCreatedResource(THREE.MeshBasicMaterial,material,"TileSetMaterial")
                    }
                    let  geo = graphics.sceneManager.load<THREE.PlaneGeometry>(THREE.PlaneGeometry,"TileSetGeometry")
                    if (material == undefined) {
                        geo = new THREE.PlaneGeometry(this.cellWidth, this.cellHeight)
                        graphics.sceneManager.addCreatedResource(THREE.PlaneGeometry,geo,"TileSetGeometry")
                    }

                    let sprite = new THREE.Mesh(geo,material)
                    
                    this.loaded = true

                    
                    let startPosX = this.shape.dim.length * -0.5 + this.pos.x
                    let startPosY = this.shape.dim.height * -0.5 +  this.pos.y
                    
                    let xPos = startPosX + c * this.cellWidth
                    let yPos = startPosY + r * this.cellHeight
                    sprite.position.setX(xPos)
                    sprite.position.setY(yPos)
                    sprite.position.setZ(this.pos.z)
                    graphics.sceneGraph.add(sprite)
                    this.sprite.push(sprite)

                }
            }
            
            


            
            //let box = new BoxGeometry(64,64,1)
            //let BoxMaterial = new MeshBasicMaterial({
            //    map: data
            //})
            //let mesh = new Mesh(box,BoxMaterial)

            //graphics.sceneGraph.add(mesh)

        } else {
            console.log("LCant find loaded asset")
            let loader =  new TextureLoader()
            let loaded = loader.load(this.path, (data) => {
                data.magFilter = THREE.NearestFilter
                data.colorSpace = THREE.SRGBColorSpace
 
                for (let r = 0; r < this.spriteMap.length; r++) {
                    for (let c = 0; c < this.spriteMap[r].length; c++) {
    
    
    
                        let tileInfo = this.textureOffsets[this.spriteMap[r][c]]
                        let texture = data.clone()
                        texture.offset.setX(tileInfo.x)
                        texture.offset.setY(tileInfo.y)
                        texture.repeat.set(tileInfo.width/this.width, tileInfo.height/this.height)
    
    
                                            
                        let material = new THREE.MeshBasicMaterial({map: texture, toneMapped:false, fog: false})
                        let geo = new THREE.PlaneGeometry(this.cellWidth, this.cellHeight)
                        let sprite = new THREE.Mesh(geo,material)
                        
                        this.loaded = true
    
                        
                        let startPosX =this.shape.dim.length* -0.5 + this.pos.x
                        let startPosY = this.shape.dim.height * -0.5 +  this.pos.y
                        
                        let xPos = startPosX + c * this.cellWidth
                        let yPos = startPosY + r * this.cellHeight
                        sprite.position.setX(xPos)
                        sprite.position.setY(yPos)
                        sprite.position.setZ(this.pos.z)
                        graphics.sceneGraph.add(sprite)
                        this.sprite.push(sprite)
                    }
                }
                

    
                
                //let box = new BoxGeometry(64,64,1)
                //let BoxMaterial = new MeshBasicMaterial({
                //    map: data
                //})
                //let mesh = new Mesh(box,BoxMaterial)
    
                //graphics.sceneGraph.add(mesh)

    
            
            }, () => {
                console.log("progressing")
            }, () => {
                throw new Error("Picture failed to load")
            })
            
    
    
            
            //this.component.position.set(this.pos.x, this.shape.pos.y, this.shape.pos.z)
    
    
            //graphics.sceneGraph.add( cube );
            
    
            
        }
        this.system = graphics
        
        //this.sprite.position.set(this.pos.x, this.shape.pos.y, this.shape.pos.z)


        //graphics.sceneGraph.add( cube );
        

        this.system = graphics
        
        
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        if (this.loaded) {
            for (let i of this.sprite) {
                i.scale.set(1, 1, 1)
            }
           
        }
        
    }
    bindPos(element: {pos: Position}) {
        this.shape.pos = element.pos
    }
    bind(element: {shape: Rectangle}) {
        this.shape = element.shape
        this.pos = element.shape.pos
    }
    getRectangle() {
        return this.shape
    }
    copy(component: TileSheet3d): void {
        this.entity = component.entity
        this.visible = component.visible
        this.alive = component.alive
        this.componentId = component.componentId

        
        this.rendered = component.rendered

        this.pos.x = component.pos.x
        this.pos.y = component.pos.y
        
        this.pos.z = component.pos.z

        


    }
    toJSON() {
        return {

                entity: this.entity,
                componentId: this.componentId,
                
                pos: {x: Math.floor(this.pos.x),y: Math.floor(this.pos.y), z: Math.floor(this.pos.z)},
                visible: this.visible,
                alive: this.alive,
                rendered: this.rendered
        }
    }

}