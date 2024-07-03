import { ContextInfo } from "../../../../../../engine/src/core/context.js";
import { Rectangle } from "../../../../../../engine/src/types/components/collision/shape.js";
import { Position } from "../../../../../../engine/src/types/components/physics/transformType.js";
import { System } from "../../../../../../engine/src/types/system.js";
import { Component, Renderable } from "../../../../../../engine/src/types/components.js";
import { GraphicsEngine } from "../../GraphicEngine.js";
import { Camera } from "../2d/Camera.js";
import { UIComponent, UIElement } from "./DoMRenderer.js";
import * as THREE from 'three'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export class Text3d implements UIElement {
    children: UIElement[] = [];
    parent?: (Renderable & { component: THREE.Object3D<THREE.Object3DEventMap>; boundingBox: Rectangle; }) | undefined;
    context!: ContextInfo;
    rendered!: boolean;
    pos: Position = {x:0, y: 0, z: -0.1};
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string =  "GRAPHICS";
    system!: GraphicsEngine
    binded: boolean = false
    component!: THREE.Group
    componentId?: number | undefined;
    color: number = 0xff0000
    text: string ="Test"
    ui: boolean = false
    fontSize: number = 10
    render(camera: Camera): void {
        if (this.binded) {
            this.system.renderer.clearDepth()


            this.system.renderer.render(this.system.uiScene, this.system.mainCamera)
        }
        
        

    }
    unmount(): void {
        this.parent?.component.parent?.remove(this.parent.component)
    }
    initResources(font: Font) {
        let Material = new THREE.MeshBasicMaterial({color:this.color});
            
        Material.needsUpdate = true
        
        let shape = font.generateShapes(this.text, 1 * this.fontSize)
        let geometry = new THREE.ShapeGeometry(shape)
        let group = new THREE.Group()
        let mesh  = new THREE.Mesh(geometry, Material)
        group.add( mesh )
        this.component = group
        this.component.position.set(this.pos.x, this.pos.y, this.pos.z)
        geometry.computeBoundingBox()
        if (this.ui) {
            this.system.uiScene.add(this.component)
        } else {
            if (this.parent) {
                this.parent.component.add(this.component)
            } else {
                this.system.sceneGraph.add(this.component)
            }
            
        }
    }

    initialize(graphicsEngine: GraphicsEngine) {
        
        this.system = graphicsEngine
        if (this.ui) {
            this.fontSize = 1/ this.fontSize
        }
        this.loadResources()


        if (this.ui) {
            graphicsEngine.addUIComponent(this)

        }

    
        
    }
    loadResources() {
        let load = new FontLoader()
        let res = this.system.sceneManager.load<Font>(Font,'/images/Fonts/helvetiker_regular.typeface.json')
        if (res) {
            this.initResources(res)

        } else {
            load.load(window.location.protocol + '//' + window.location.host + '/images/Fonts/helvetiker_regular.typeface.json', (font) => {
                this.initResources(font)
                this.system.sceneManager.addCreatedResource(Font, font, '/images/Fonts/helvetiker_regular.typeface.json')

                if (this.parent) {
                    this.parent.component.add(this.component)
                }
        
            })
        }
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        if (this.parent && this.component && !this.binded) {
            this.binded = true


        } else if (!this.parent  &&this.component && !this.binded) {
            this.binded = true
            
            
            

        }
        if (this.component) {
            let component = this.component.children[0] as THREE.Mesh
            let box = component.geometry.boundingBox
            let x = 0
            let y = 0
            
            if (box) {
                x = - 0.5 * ( box.max.x - box.min.x )
                y = - 0.5 * ( box.max.y - box.min.y )
            }
            
            this.component.position.set(this.pos.x + x, this.pos.y + y,this.pos.z)
            

        }

        
        
        for (let i of this.children) {
            i.update(dt)
        }

    }
    updateText() {
        let textMesh = this.component.children[0] as THREE.Mesh
        let shapeGeo = textMesh.geometry as THREE.ShapeGeometry

        let res = this.system.sceneManager.load<Font>(Font,'/images/Fonts/helvetiker_regular.typeface.json')
        if (res) {
            let newGeometry = res.generateShapes(this.text,this.fontSize)
            shapeGeo.dispose()
            textMesh.geometry = new THREE.ShapeGeometry(newGeometry)
            textMesh.geometry.computeBoundingBox()
        
        } else {
            
        }
        

    }
    getRectangle(): Rectangle {
        
        return {
            pos: this.pos,
            dim: {
                length: this.text.length,
                height: 1
            },
            rot: 0
        }
    }


    copy(component: Component): void {
        throw new Error("Method not implemented.");
    }

}