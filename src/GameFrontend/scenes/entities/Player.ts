import { Collideable, Component } from "../../../engine/src/types/components.js";
import { Scene, Stage } from "../../../engine/src/core/scene.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Transform } from "../../../engine/src/systems/physics/components/transform.js";
import { Rectangle as Rect } from "../../../engine/src/types/components/collision/shape.js";
import {  Sprite } from "../../../engine/src/systems/graphics/components/2d/Sprite.js";
import { Rectangle } from "../../../engine/src/systems/graphics/components/Rectangle.js";
import { MouseListener } from "../../../engine/src/systems/events/components/MouseHandler.js";
import { Script } from "../../../engine/src/systems/scripting/components/Script.js";
import { Position, Velocity } from "../../../engine/src/types/components/physics/transformType.js";
import { BoxCollider } from "../../../engine/src/systems/Collision/components/Collider.js";
import { Templar } from "./Templar.js";
import { EngineType } from "../../../engine/src/constants/engineType.js";
import { KeyboardListener } from "../../../engine/src/systems/events/components/KeyboardHandler.js";
import { SceneManager } from "../../../engine/src/core/managers/SceneManager.js";
import { Engine } from "../../../engine/src/core/engine.js";
import { TimedSpriteSheet } from "../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { MainScene } from "../MainScene.js";
import { ScriptingEngine } from "../../../engine/src/systems/scripting/ScriptingEngine.js";
import { CollisionSystem } from "../../../engine/src/systems/Collision/CollisionSystem.js";

export class Player implements Entity{
    components: Component[];
    id?: number | undefined;
    scene?: Stage | undefined;
    className: string = "Player"
    transform: Transform

    constructor(length: number = 32, height: number = 32, pos: Position={x:0,y: 0,z:0}, vel: Velocity={x: 0, y: 0.1,z: 0}, engineType: EngineType = EngineType.SOCKETSERVER) {
        
        

        
        
        let transform: Transform = new Transform(pos, vel)
        this.transform = transform
        let shape = {dim: {length: length, height: height}, rot: 0, pos: pos}
        //let collider: BoxCollider = new BoxCollider(-1,{length:64, height:64}, pos,colliderCallback)
        let sprite: TimedSpriteSheet = new TimedSpriteSheet("/images/SwordSpriteSheet.png", shape, 40, 20)
        


        

        let script: Script = new Script(this.className, EngineType.SOCKETSERVER)
        
        script.setInit((engine: ScriptingEngine) => {
            let system = this.scene?.querySystem(CollisionSystem,"COLLISION")
            if (system) {
                
            }

        })
        script.setCallBack((dt:number) => {
             
            //console.log("Script runing")
            
            
        })
        


        this.components = [
            transform,
            sprite,

            script
        ]
       
    }
    clone() {
        return new Player()
    }
    

}