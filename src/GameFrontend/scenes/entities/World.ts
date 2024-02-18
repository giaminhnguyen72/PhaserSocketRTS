import { EngineType } from "../../../engine/src/constants/engineType.js";
import { MouseEmitter, MouseListener } from "../../../engine/src/systems/events/components/MouseHandler.js";
import { Scene } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity, EntityPacket } from "../../../engine/src/types/Entity.js";
import { KeyBoardEmitter } from "../../../engine/src/systems/events/components/KeyboardHandler.js";
import { SocketClient} from "../../../engine/src/systems/MultiplayerClient/components/SocketClientHandler.js";
import { Templar } from "./Templar.js";
import { MainCamera } from "./MainCamera.js";
import { Player } from "./Player.js";
import { Label } from "./Label.js";


import { QuadTree } from "../../../engine/src/structs/Quadtree.js";
import { Script } from "../../../engine/src/systems/scripting/components/Script.js";
import { Rectangle } from "../../../engine/src/systems/graphics/components/Rectangle.js";
import { RectangleEntity } from "./RectangleEntity.js";

export class World implements Entity{
    something: number = 0
    components: Component[] = [];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "World";
    constructor(engineType:EngineType) {
        let map: Map<string, ()=>Entity> = new Map()
        map.set("Templar", ()=>{ return new Templar()})
        map.set("MainCamera", () => {console.log("camera made");return new MainCamera()})
        map.set("Player", ()=> {return new Player()})
        map.set("Label", () => {return new Label()})

        let quadtree = new QuadTree({pos:{x: 500, y: 250}, dim:{height: 500, length: 1000}})
        let node = quadtree.parentNode
        let list = [node]
        let padding = 2
        let quadMap: Map<any, Rectangle> = new Map()
        while (list.length > 0) {
            let item = list.pop()
            if (item) {
                for (let i = 0; i < item?.children.length; i++) {
                    list.push(item.children[i])
                }
                let rectangle = new Rectangle({pos: {x: item.area.pos.x , y: item.area.pos.y , z: -item.depth}, dim:{height: item.area.dim.height -padding * 2 * Math.abs(item.depth), length: item.area.dim.length - padding * 2 * Math.abs(item.depth)}, rot: 0},getRandomColor(), 10)
                
                this.components.push(rectangle)
                quadMap.set(item, rectangle)
            }
            
            


        }
        let mouse = new MouseListener({"click": (clickEvent) => {
            console.log("Position x is " + clickEvent.pos.x)
            console.log("Position y is " + clickEvent.pos.y)
            console.log("Name is " + clickEvent.eventName)
            this.something++

            
            if (this.scene) {
                let pos = {x: clickEvent.pos.x, y: clickEvent.pos.y, z: -20}

                let dim = {length: Math.random() * 30 + 1 , height: Math.random() * 30 + 1}
                let rect = new RectangleEntity(pos, dim)
                this.scene.addEntity( rect)
                let quad = quadtree.insert(rect)
                let quadRect = quadMap.get(quad)
                if (quadRect) {
                    rect.rectangle.color = quadRect.color
                }

            }
            
        },
        "dblclick": (clickevnt) => {
            
        }
    })
    /** 
        let socket = new SocketClient(
            {}
            , {engineType: EngineType.SOCKETCLIENT, entityGeneratorMap: map})
        
        
        this.components.push(new MouseEmitter(engineType), mouse, new KeyBoardEmitter(engineType), socket) 
    }
    */
    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
/**
 * socket.on("update", (entities: EntityPacket[]) => {

                    for (let entitySent of entities) {
                        let getScene = engine.sceneManager.scenes.get(entitySent.sceneId)
                        if (getScene) {
                            let queriedEntity = getScene.entities.get(entitySent.id)
                            if (queriedEntity) {
                                for (let i = 0; i < entitySent.components.length; i++) {
                                    let engine = getScene.engineComponents.get(entitySent.components[i].engineTag)
                                    let comp = engine?.get(entitySent.components[i].componentId as number)
                                    if (comp) {
                                        comp.copy(entitySent.components[i])
                                    } 
                                }
                            } else {
                                console.log("Adding new Entity")
                                        let entityFactory = map.get(entitySent.entityClass)
                                        if (entityFactory) {
                                            let entity = entityFactory()
                                            entity.id = entitySent.id
                                            entity.scene = getScene as Scene
                                            for (let j = 0; j < entity.components.length; j++) {
                                                entity.components[j].copy(entitySent.components[j])
                                            }
                                            serverAdd(getScene, entity)
                                        } 
        
                                        
                                    
                                    
                                    
                                }
                            
                               
    
                            
                        } else {
                            throw new Error("Scene not found")
                        }
                    }
    
                })
 * 
 * 
 * 
 * 
 * 
 */