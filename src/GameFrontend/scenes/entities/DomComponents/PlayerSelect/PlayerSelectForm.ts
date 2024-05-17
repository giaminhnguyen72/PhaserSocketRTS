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

export class PlayerUIForm implements Entity{
    components: Component[] = [];
    id?: number | undefined;
    scene!: Scene ;
    className: string = "UIForm";

    constructor() {
        let redButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, 0xff0000)
        let blueButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,0xffff00)
        let greenButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, 0xff0000)
        let whiteButton = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,0xffff00)
        let redButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, 0xff0000)
        let blueButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,0xffff00)
        let greenButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1, 0xff0000)
        let whiteButton1 = new UIComponent(0.125, 0.5, {x:0, y:0, z: 0}, 1,0xffff00)
        let camera = new UIComponent(0.8, 0.2, {x:0, y:0, z: 1}, 0,undefined ,  redButton, blueButton, greenButton, whiteButton, redButton1, blueButton1, greenButton1, whiteButton1)
        camera.texture = "/images/Background/InventoryUI.png"
        let redUI = new UIListener(redButton.boundingBox, () => {redButton.updateTexture("/images/Characters/Orc.png")})
        let blueUI = new UIListener(blueButton.boundingBox, () => {blueButton.setMaterial({color:0xffff00})})
        let greenUI = new UIListener(greenButton.boundingBox, () => {greenButton.setMaterial({color:0xffff00})})
        let whiteUI = new UIListener(whiteButton.boundingBox, () => {whiteButton.setMaterial({color:0xffff00})})
        let redUI1 = new UIListener(redButton1.boundingBox, () => {redButton1.setMaterial({color:0xffff00})})
        let blueUI1 = new UIListener(blueButton1.boundingBox, () => {blueButton1.setMaterial({color:0xffff00})})
        let greenUI1 = new UIListener(greenButton1.boundingBox, () => {greenButton1.setMaterial({color:0xffff00})})
        let whiteUI1 = new UIListener(whiteButton1.boundingBox, () => {whiteButton1.setMaterial({color:0xffff00})})
        let UI = new UIListener(camera.boundingBox, () => {camera.setMaterial({color:0xffff00})}, redUI, blueUI,greenUI, whiteUI,redUI1, blueUI1,greenUI1, whiteUI1)
        let script = new Script(this.className,EngineType.SOCKETCLIENT)
        script.properties.set("Selected", 0)
        script.properties.set("Skills", [0,2,2,2,2,2,2,2])
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
        this.components.push(camera, UI, listener, script)
    }
    clone(): Entity {
        throw new Error("Method not implemented.");
    }

}