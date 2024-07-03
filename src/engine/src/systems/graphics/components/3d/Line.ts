import { ContextInfo } from "../../../../../../engine/src/core/context.js";
import { Rectangle } from "../../../../../../engine/src/types/components/collision/shape.js";
import { Position } from "../../../../../../engine/src/types/components/physics/transformType.js";
import { System } from "../../../../../../engine/src/types/system.js";
import { Component, Renderable } from "../../../../../../engine/src/types/components.js";
import { GraphicsEngine } from "../../GraphicEngine.js";
import { Camera } from "../2d/Camera.js";
import { UIComponent, UIElement } from "./DoMRenderer.js";
import * as THREE from 'three'
import { InstancedBufferGeometry, Mesh } from "three";

export class Line implements UIElement {
    children: UIElement[] = [];
    parent?: (Renderable & { component: THREE.Object3D<THREE.Object3DEventMap>; boundingBox: Rectangle; }) | undefined;
    context!: ContextInfo;
    rendered!: boolean;
    pos: Position = {x:0, y: 0, z: 0};
    entity?: number | undefined;
    visible: boolean = true;
    alive: boolean = true;
    engineTag: string =  "GRAPHICS";
    system!: GraphicsEngine
    length: number = 1
    binded: boolean = false
    component!: THREE.Line
    componentId?: number | undefined;
    color: number = 0
    isUI: boolean = true
    rot: number = 0
    render(camera: Camera): void {
        
        this.system.renderer.clearDepth()
            
        this.system.renderer.render(this.component, this.system.mainCamera)

    }
    unmount(): void {
        this.parent?.component.parent?.remove(this.parent.component)
        
    }
    initComponent(geometry: THREE.BufferGeometry) {
        let LineMaterial = new THREE.LineBasicMaterial({color: this.color})

        this.component = new THREE.Line(geometry,LineMaterial)
        this.component.position.set(this.pos.x, this.pos.y, this.pos.z)
        this.component.rotation.set(0, 0, this.rot)
        this.component.scale.setX(this.length)
        if (this.parent) {
            this.setClippinngPlanes(LineMaterial)
        }
    }

    initialize(graphicsEngine: GraphicsEngine) {
        this.system = graphicsEngine
        
        let lineGeo = graphicsEngine.sceneManager.load<THREE.BufferGeometry>(THREE.BufferGeometry, "Line")
        if (lineGeo) {
            this.initComponent(lineGeo)

        } else {
            let geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.5,0,0), new THREE.Vector3(0.5,0,0)])
            let geo = graphicsEngine.sceneManager.addCreatedResource(THREE.BufferGeometry, geometry,"Line")
            this.initComponent(geo)
        }
        



        
    }
    update(dt: number, ctx?: CanvasRenderingContext2D | undefined): void {
        if (this.parent && this.component && !this.binded) {
            this.binded = true
            this.parent.component.add(this.component)

        } else if (!this.parent  &&this.component && !this.binded) {
            this.binded = true
            this.system.mainCamera.add(this.component)

        }
        if (this.component) {
            this.component.position.set(this.pos.x, this.pos.y, 0)
        }


        
        for (let i of this.children) {
            i.update(dt)
        }

    }
    getRectangle(): Rectangle {
        return {
            pos: this.pos,
            dim: {
                length: this.length,
                height: 1
            },
            rot: 0
        }
    }
    setClippinngPlanes(mat: THREE.LineBasicMaterial) {
        if (this.parent) {
            let item1 = this.parent
            let minX = item1.pos.x - item1.boundingBox.dim.length / 2
            let maxX = item1.pos.x + item1.boundingBox.dim.length / 2
            let minY = item1.pos.y - item1.boundingBox.dim.height / 2
            let maxY = item1.pos.y + item1.boundingBox.dim.height / 2
            mat.clippingPlanes = [
                new THREE.Plane(new THREE.Vector3(1, 0, 0), -minX),   // Right plane deletes everything to the Left
                new THREE.Plane(new THREE.Vector3(-1, 0, 0), maxX),   // Left plane

                new THREE.Plane(new THREE.Vector3(0, 1, 0), -minY),   // Right plane deletes everything to the Left
                new THREE.Plane(new THREE.Vector3(0, -1, 0), maxY),   // Left plane
            ]
        }
    }

    copy(component: Component): void {
        throw new Error("Method not implemented.");
    }

}