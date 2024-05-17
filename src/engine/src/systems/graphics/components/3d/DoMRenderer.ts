import { ContextInfo } from "../../../../core/context.js";
import { GraphicsEngine } from "../../GraphicEngine.js";
import { Component, Renderable } from "../../../../types/components.js";
import { Rectangle } from "../../../../types/components/collision/shape.js";
import { Position, Vector3 } from "../../../../types/components/physics/transformType.js";
import { Entity } from "../../../../types/Entity.js";
import { System } from "../../../../types/system.js";
import { Transform } from "../../../physics/components/transform.js";
import * as THREE from "three";
import { OrthographicCamera3d } from "./OrthographicCamera3d.js";
import { Object3D } from "three";

export class UIComponent implements Renderable {
    context!: ContextInfo;
    
    system!: GraphicsEngine;
    entity!: number;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string = "GRAPHICS";
    componentId?: number | undefined;

    pos: Position
    boundingBox: Rectangle
    parent?: Renderable & {component: Object3D}
    children: (UIComponent)[] = []
    component!: THREE.Mesh
    binded: boolean = false
    alignment: number = 0
    color?: number
    texture: string =""

    constructor(width: number=-1, height: number = -1, curr: Position={x:0,y:0,z:-1} ,  alignment: number =0, color?: number , ...children: UIComponent[] ) {
        this.boundingBox = {
            pos:curr,
            dim: {
                length: width,
                height: height
            },
            rot: 0
        }
        this.color= color
        this.children = children
        this.pos= curr
        this.pos.z = 0

        if (alignment == 0) {
            this.pos.y = this.pos.y - 1  + this.boundingBox.dim.height /2
        }



        
    }
    unmount(): void {
        this.parent?.component.parent?.remove(this.parent.component)
        for(let i of this.children) {
            i.unmount()
        }
    }
    getRectangle(): Rectangle {
        return {
            pos: this.pos,
            dim: {
                height: this.boundingBox.dim.height,
                length: this.boundingBox.dim.length,
            },
            rot: 0
        }
    }
    rendered: boolean = false;
    copy<T>(camera: UIComponent): void {
        this.entity = camera.entity
        this.pos.x = camera.pos.x
        this.pos.y = camera.pos.y
        this.pos.z = camera.pos.z

        this.componentId = camera.componentId
        this.boundingBox.dim.length =this.boundingBox.dim.length
        this.boundingBox.dim.height =this.boundingBox.dim.height
        this.visible = camera.visible
        this.alive = camera.alive
        this.rendered = camera.rendered
    }
    bindPos(element: {pos: Vector3}) {

        this.pos = element.pos

    }

    initialize(graphics: GraphicsEngine): void {
        

        if (this.parent) {
            let boundingBox = this.parent.getRectangle()
            this.boundingBox.dim.length *= boundingBox.dim.length 
            this.boundingBox.dim.height *= boundingBox.dim.height



        } else {
            graphics.addUIComponent(this)
        }
        const loader = new THREE.TextureLoader();
        let item = this
        if (this.texture != "") {
            loader.load(this.texture, function ( texture ) {
                let componentGeo = new THREE.PlaneGeometry(item.boundingBox.dim.length, item.boundingBox.dim.height)
                let config;
                if (item.color) {
                    config = {map: texture, side: THREE.DoubleSide, color: item.color}
                } else {
                    config = {map: texture, side: THREE.DoubleSide}
                }
                const material = new THREE.MeshBasicMaterial( config);

                const component = new THREE.Mesh( componentGeo, material );
                item.component = component
                item.component.position.set(item.pos.x, item.pos.y, item.pos.z)
                if (item.children.length > 0) {
            
                    let posX = item.boundingBox.pos.x -  item.boundingBox.dim.length * (item.children.length  - 1)  / (2 * item.children.length)
                    
                    for (let i of item.children) {
                        i.parent = item
        
                        i.pos.x = posX
        
                        posX += item.boundingBox.dim.length / (item.children.length)
                        
                        i.initialize(graphics)

                    }
                }
            });
        } else {
            let componentGeo = new THREE.PlaneGeometry(item.boundingBox.dim.length, item.boundingBox.dim.height)
                const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide, color: item.color} );

                const component = new THREE.Mesh( componentGeo, material );
                item.component = component
                this.component.position.set(this.pos.x, this.pos.y, this.pos.z)
                if (this.children.length > 0) {
            
                    let posX = this.boundingBox.pos.x -  this.boundingBox.dim.length * (this.children.length  - 1)  / (2 * this.children.length)
                    
                    for (let i of this.children) {
                        i.parent = this
        
                        i.pos.x = posX
        
                        posX += this.boundingBox.dim.length / (this.children.length)
                        
                        i.initialize(graphics)

                    }
                }
        }
        
        
        
        



    }
    updateTexture(src: string) {
        const loader = new THREE.TextureLoader()
        loader.load(src, (data) => {
            let map = this.component.material as THREE.MeshBasicMaterial
            map.map = data
            map.needsUpdate = true
        })
        
    }
    update(dt: number): void {

        if (this.parent && !this.binded && this.component) {

            this.parent.component.add(this.component)
            this.binded = true
        } else if (!this.parent && !(this.binded) &&this.component) {
            
            this.system.mainCamera.add(this.component)
            this.binded = true
        }
        if (this.binded) {
            this.component.position.set(this.pos.x, this.pos.y, 0)
        }
        for (let i of this.children) {
            i.update(dt)
        }



        
        
        

    
        


        
        
    }
    render(): void {

        if (this.binded) {
            this.system.renderer.clearDepth()
            this.system.renderer.render(this.component, this.system.mainCamera)
        }
        
    }
    renderCamera(array: Renderable[]): void {
        if (this.visible) {

            
            
        //console.log("Camera is rendered " + items.length + "elements")

        
        }
        
    }
    setMaterial(materialMap: {color: number, src?: string} ) {
        if (materialMap.color) {
            let material = this.component.material as THREE.MeshBasicMaterial
            material.color.setHex(materialMap.color)
        }
    }
    toJSON() {
        return {
            entity: this.entity,
        
            componentId: this.componentId,
            width: this.boundingBox.dim.length,
            height: this.boundingBox.dim.height,
            visible: this.visible,
            alive: this.alive,

            rendered: this.rendered,
            pos: this.pos,


        }
    }
    
}