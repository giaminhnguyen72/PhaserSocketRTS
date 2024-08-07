
import { Component, Renderable,  } from "../../../../types/components.js";
import { Entity } from "../../../../types/Entity.js";
import { Scene } from "../../../../core/scene.js";
import { Transform } from "../../../physics/components/transform";

import { ContextInfo } from "../../../../core/context.js";
import { getTopX, getTopY, Rectangle } from "../../../..../../../types/components/collision/shape.js";

import { OrthographicCamera3d } from "./OrthographicCamera3d.js";
import { Position } from "../../../../../../engine/src/types/components/physics/transformType.js";
import { System } from "../../../../../../engine/src/types/system.js";
import { BoxGeometry, Material, Mesh, MeshBasicMaterial,  NearestFilter,  Scene as SceneGraph,  Sprite, SpriteMaterial, SRGBColorSpace, Texture, TextureLoader } from "three/src/Three.js";
import { GraphicsEngine } from "../../GraphicEngine.js";
import { TextureResource } from "./Texture.js";


export class Sprite3d implements Component, Renderable {
    
    entity!: number;
    componentId?: number;
    engineTag: string = "GRAPHICS"
    shape: Rectangle
    pos: Position;
    context!: ContextInfo
    component!: Sprite 
    src: string
    loaded: boolean = false
    batched: boolean = false
    
    visible: boolean = true;
    alive: boolean = true;
    system!: GraphicsEngine;
    reflect: number = 1
    material!: SpriteMaterial
    constructor(shape: Rectangle = {pos:{x:0, y:0, z:0}, dim: {height: 0, length: 0}, rot: 0}, src:string = "") {
        
        


        this.src = src
        this.shape = shape
        this.pos = this.shape.pos
        
        


    }
    unmount(): void {

        
        this.system.sceneGraph.remove(this.component);
        if (this.component) {
            if (this.component.material) {
                (this.component.material ).dispose();
            }
            // if (this.component.geometry) {
            //     (this.component.geometry ).dispose()
            // }
        }
        
        
    }
    rendered: boolean = false;
    
    copy(element:Sprite3d): void {
        this.componentId = element.componentId
        this.entity = element.entity

        this.shape.dim.height = element.shape.dim.height
        this.shape.dim.length = element.shape.dim.length
        if (element.shape.pos.x != element.pos.x) {
            
            throw new Error()
        }
        if (element.shape.pos.y != element.pos.y) {
            throw new Error()
        }
        if (element.shape.pos.z != element.pos.z) {
            throw new Error()
        }
        this.shape.pos.x = element.shape.pos.x
        this.shape.pos.y = element.shape.pos.y
        this.shape.pos.z = element.shape.pos.z
        this.shape.rot = element.shape.rot
        this.visible =  element.visible
        this.pos.x = element.pos.x
        this.pos.y = element.pos.y
        this.pos.z = element.pos.z


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
    render(cam:OrthographicCamera3d): void {
        



        
    }

    update(dt: number): void {
        if (this.loaded) {

            this.component.position.x = this.pos.x
            this.component.position.y = this.pos.y
            this.component.position.z = this.pos.z
            this.material.rotation = this.shape.rot
            this.component.scale.set(this.shape.dim.length , this.shape.dim.height, 1)
            if (this.material.map && this.reflect != 0) {
                this.material.map.center.set(0.5,0.5)
                this.material.map.repeat.set(this.reflect,1)
            }
        }
    }
    initialize(graphics:GraphicsEngine) {
        let w = graphics.sceneManager.loadResource<TextureResource>(TextureResource, this.src)
        if (w) {
            let texture = w.clone()
            this.material = new SpriteMaterial({map: texture, toneMapped:false, fog: false})
            texture.center.set(0.5,0.5)
            this.component = new Sprite(this.material)
            this.component.position.x = this.pos.x
            this.component.position.y = this.pos.y
            this.component.position.z = this.pos.z
            this.loaded = true

            
            //let box = new BoxGeometry(64,64,1)
            //let BoxMaterial = new MeshBasicMaterial({
            //    map: data
            //})
            //let mesh = new Mesh(box,BoxMaterial)

            //graphics.sceneGraph.add(mesh)
            graphics.sceneGraph.add(this.component)
        } else {
            console.log("LCant find loaded asset")
            let loader =  new TextureLoader()
            let loaded = loader.load(this.src, (data) => {
                data.magFilter = NearestFilter
                data.colorSpace = SRGBColorSpace
                this.material = new SpriteMaterial({map: data, toneMapped:false, fog: false})
                data.center.set(0.5,0.5)
                this.component = new Sprite(this.material)
                this.component.position.x = this.pos.x
                this.component.position.y = this.pos.y
                this.component.position.z = this.pos.z
                this.loaded = true
    
                
                //let box = new BoxGeometry(64,64,1)
                //let BoxMaterial = new MeshBasicMaterial({
                //    map: data
                //})
                //let mesh = new Mesh(box,BoxMaterial)
    
                //graphics.sceneGraph.add(mesh)
                graphics.sceneGraph.add(this.component)
    
            
            }, () => {
                console.log("progressing")
            }, () => {
                throw new Error("Picture failed to load")
            })
            
    
    
            
            //this.component.position.set(this.pos.x, this.shape.pos.y, this.shape.pos.z)
    
    
            //graphics.sceneGraph.add( cube );
            
    
            
        }
        this.system = graphics

    }
    setSrc(src:string) {
        console.log("Source changed")
        this.src = src

    }
    toJSON() {
        return {
            entity: this.entity,
            componentId: this.componentId,
            engineTag: this.engineTag,
            pos: this.pos,
            visible: this.visible,
            alive: this.alive,
            src: this.src,
            shape:this.shape,
            renderred: this.rendered
            
        }
    }
    flipX() {
        if (this.material.map) {
            this.material.map.center.set(0.5,0.5)
            this.material.map.repeat.set(-1,1)
        }
    }
}
