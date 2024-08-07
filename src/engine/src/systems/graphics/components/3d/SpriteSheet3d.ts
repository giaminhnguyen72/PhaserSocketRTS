

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
import { NearestFilter, Sprite, SRGBColorSpace } from "three";
import { GRAPHICS_TAG } from "../../../../../../engine/src/constants/componentType.js";
import * as THREE from 'three'
import { TextureResource } from "./Texture.js";
export class TimedSpriteSheet3d implements Renderable {
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = GRAPHICS_TAG;
    componentId?: number | undefined;
    system!: GraphicsEngine;
    path: string 
    image!:HTMLImageElement
    delay:number
    column:number = 0
    row: number= 0
    time:number = 0
    length: number
    // Array of number of columns in each row
    // To get number of rows use numOfStates.length 
    numOfStates: number[]
    maxColumn: number
    constructor(path: string, rectangle: Rectangle, delay:number, imageLength: number, numOfStates: number[] = []) {
        
        this.path = path
        this.pos = rectangle.pos
        this.shape = rectangle
        this.delay = delay
        this.length = imageLength
        
        this.numOfStates = numOfStates
        if (numOfStates.length == 0) {
            this.maxColumn = 0
        } else {
            this.maxColumn = numOfStates[0]
            for (let i of numOfStates) {
                if (i > this.maxColumn) {
                    this.maxColumn = i
                }
            }
        }
        
        
    }
    switchImage(path: string) {
        let image = this.system.images.get(path)
        if (image) {
            this.image = image
        } else {
            this.image = new Image()
            this.image.src = path
            this.system.images.set(path, this.image)
        }
    }
    unmount(): void {
        if (this.sprite) {
            this.sprite.parent?.remove(this.sprite);
            if (this.sprite.material) {
                (this.sprite.material ).dispose();
            }
            
        }

        

    }
    loaded: boolean  = false
    context!: ContextInfo;
    rendered: boolean= false;
    pos: Position;
    shape:Rectangle
    sprite!: Sprite
    material!:SpriteMaterial
    render(cam: OrthographicCamera3d): void {
        if (this.context.ctx) {
            let x = getTopX(this.shape)

            let y = getTopY(this.shape)
            let screenX = cam.scale.x * (x ) - cam.transform.x 
            let screemY = cam.scale.y* (y) - cam.transform.y
            this.context.ctx.drawImage(this.image, this.shape.dim.length * this.column, this.shape.dim.height * this.row, this.shape.dim.length, this.shape.dim.height,
              screenX, screemY , this.shape.dim.length * cam.scale.x, this.shape.dim.height * cam.scale.y)
        } else {

        }
    }
    create(path: string) {
        let w = this.system.sceneManager.loadResource<TextureResource>(TextureResource, this.path)
        if (w) {
            let texture = w.clone()
            let data = texture
            data.repeat.set(1/this.maxColumn, 1/this.numOfStates.length)
            data.magFilter = NearestFilter
            data.colorSpace = SRGBColorSpace
            let material = new SpriteMaterial({map: data})
            this.material = material
            let sprite = new Sprite(material)
            this.sprite = sprite
            this.loaded = true
            
            this.system.sceneGraph.add(sprite)
            return
        }
        let loader =  new TextureLoader()
        let loaded = loader.load(this.path, (data) => {
            data.repeat.set(1/this.maxColumn, 1/this.numOfStates.length)
            data.magFilter = NearestFilter
            data.colorSpace = SRGBColorSpace
            let material = new SpriteMaterial({map: data})
            this.material = material
            let sprite = new Sprite(material)
            this.sprite = sprite
            this.loaded = true
            
            this.system.sceneGraph.add(sprite)
            

            
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

    } 
    initialize(graphics: GraphicsEngine): void {
        this.system = graphics
        
        this.create(this.path)

        


        
        //this.sprite.position.set(this.pos.x, this.shape.pos.y, this.shape.pos.z)


        //graphics.sceneGraph.add( cube );
        


        
        this.column = 0
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        this.time += dt

        if (this.time > this.delay) {
            let stateChange = Math.floor(this.time / this.delay)
            
            let numStates;
            if (this.row >= 0 && this.row < this.numOfStates.length) {
                numStates = this.numOfStates[this.row]
            } else {
                numStates = 1
            }
            this.column = (1 + this.column) % numStates
            this.time = this.time % this.delay
            
            if (this.loaded) {
                this.sprite.material.rotation = this.shape.rot
                if (this.material.map) {

                    this.material.map.offset.x = this.column / this.maxColumn
                    let state = 0;
                    
                    this.material.map.offset.y = this.row / this.numOfStates.length

                    this.sprite.position.x = this.pos.x
                    this.sprite.position.y = this.pos.y
                    this.sprite.position.z = this.pos.z
                    this.sprite.material.rotation = this.shape.rot

                    this.sprite.scale.set(this.shape.dim.length , this.shape.dim.height, 1)

                } else {
                    throw new Error("Not found")
                }
                
            }  else {
                console.log(this.path + " not loaded")
            }

        }
    }
    bindPos(element: {pos: Position}) {
        this.shape.pos = element.pos
        this.pos = element.pos
    }
    bind(element: {shape: Rectangle}) {
        this.shape = element.shape
        this.pos = element.shape.pos
    }
    getRectangle() {
        return this.shape
    }
    copy(component: TimedSpriteSheet3d): void {
        this.entity = component.entity
        this.visible = component.visible
        this.alive = component.alive
        this.componentId = component.componentId

        this.delay = component.delay
        
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

                delay: this.delay,
                column: this.column,
                rendered: this.rendered
        }
    }

}