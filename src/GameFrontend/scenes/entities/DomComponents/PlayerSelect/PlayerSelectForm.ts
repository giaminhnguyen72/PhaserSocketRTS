import { OrthographicCamera3d } from "../../../../../engine/src/systems/graphics/components/3d/OrthographicCamera3d.js";
import { Scene } from "../../../../../engine/src/core/scene.js";
import { Component } from "../../../../../engine/src/types/components.js";
import { Entity } from "../../../../../engine/src/types/Entity.js";
import { UIComponent } from "../../../../../engine/src/systems/graphics/components/3d/DoMRenderer.js";
import { UIListener } from "../../../../../engine/src/systems/events/components/UIListener.js";
import { Script } from "../../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../../engine/src/constants/engineType.js";
import { KeyboardListener } from "../../../../../engine/src/systems/events/components/KeyboardHandler.js";
import { SocketClient } from "../../../../../engine/src/systems/MultiplayerClient/components/SocketClientHandler.js";
import { Text3d } from "../../../../../engine/src/systems/graphics/components/3d/Text.js";

export class PlayerUIForm implements Entity{
    components: [Script, UIComponent,KeyboardListener,UIComponent] ;
    id?: number | undefined;
    scene!: Scene ;
    className: string = "UIForm";

    constructor() {

        let redButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, )
        redButton.texture = "/images/Background/UI/Icons.png"
        redButton.tileNumber = 13
        let blueButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,)
        blueButton.texture = "/images/Background/UI/Icons.png"
        blueButton.tileNumber = 13
        let greenButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, )
        greenButton.texture = "/images/Background/UI/Icons.png"
        greenButton.tileNumber = 13
        let whiteButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,)
        whiteButton.texture = "/images/Background/UI/Icons.png"
        whiteButton.tileNumber = 13
        let redButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, )
        redButton1.texture = "/images/Background/UI/Icons.png"
        redButton1.tileNumber = 13
        let blueButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,)
        blueButton1.texture = "/images/Background/UI/Icons.png"
        blueButton1.tileNumber = 13
        let greenButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, )
        greenButton1.texture = "/images/Background/UI/Icons.png"
        greenButton1.tileNumber = 13
        let whiteButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,)
        whiteButton1.texture = "/images/Background/UI/Icons.png"
        whiteButton1.tileNumber = 13
        let camera = new UIComponent(0.8, 0.2, {x:0, y:0, z: -0.1}, 0,undefined ,  redButton, blueButton, greenButton, whiteButton, redButton1, blueButton1, greenButton1, whiteButton1)
        camera.texture = "/images/Background/InventoryUI.png"


        let script = new Script(this.className,EngineType.SOCKETCLIENT)
        script.properties.set("HP", 100)
        script.properties.set("Selected", 0)
        script.properties.set("Skills", [0,0,0,0,0,0,0,0])
        let skills = new Set()
        skills.add(0)
        script.properties.set("Unlocked", skills)
        script.setInit((sys) => {
            sys.addSuperClasses(script, "UIForm")
        })


        let text = new Text3d()
        // text.ui = true
        text.text = "HP: 100"
        text.fontSize = 1/50
        text.pos.x = 0
        text.pos.y = 0.05
        text.pos.z = 0.1
        text.color = 0xffffff



        let staminaText = new Text3d()
        // staminaText.ui = true
        staminaText.text = "Stamina: 100"
        staminaText.fontSize = 1/50
        staminaText.pos.x = 0
        staminaText.pos.y = 0
        staminaText.pos.z = 0.1
        staminaText.color = 0xffffff

        let exp = new Text3d()
        // exp.ui = true
        exp.text = "Exp: 0"
        exp.fontSize = 1/50
        exp.pos.x = 0
        exp.pos.y = -0.05
        exp.pos.z = 0.1
        exp.color = 0xffffff
        
        let healthDataBoX = new UIComponent(0.4, 0.2, {x:-0.8, y:-0.9, z: -0.1}, 1,undefined)
        healthDataBoX.texture = "/images/Background/UI/SquareUIBox.png"
        healthDataBoX.children.push(text,staminaText, exp)
        let listener = new KeyboardListener({
            "keydown": (ev) => {
                let selected = script.properties.get("Selected")
                

                if (selected != null && selected != undefined) {

                    switch (ev.key) {
                        case "a":
                            script.properties.set("Selected", (selected + 7) % 8)
                        
                            break
                        case "d":
                            script.properties.set("Selected", (selected + 1) % 8)
                            break
                        case "q":
                            text.pos.z += 0.05
                            break 
                        case "e":
                            text.pos.z -= 0.05
                            break 
                        case "w":
                            for (let i of this.scene.components) {
                                
                                if (i instanceof SocketClient) {
                                    let skills = script.properties.get("Skills")
                                    
                                    let skillID = skills[selected]
                                    i.queueEvent({
                                        event: "Skill",
                                        data: skillID
                                    })
                                }
                            }
                            
                    }
                }

            }
        })
        
        this.components = [script, camera, listener,healthDataBoX]
    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}