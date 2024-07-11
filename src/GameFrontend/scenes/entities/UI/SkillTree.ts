// Skill ID
// Image Path
// Skill Cost
// Unlocked or not,
//Skills[]

import { UIComponent } from "../../../../engine/src/systems/graphics/components/3d/DoMRenderer.js"
import { Scene } from "../../../../engine/src/core/scene.js"
import { Component } from "../../../../engine/src/types/components.js"
import { Entity } from "../../../../engine/src/types/Entity.js"
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js"
import { TextureResource, TilesheetResource } from "../../../../engine/src/systems/graphics/components/3d/Texture.js"
import { UIOFFSETS } from "./UIConstants.js"
import { EngineType } from "../../../../engine/src/constants/engineType.js"
import { UIDATA } from "./UISkillData.js"
import * as THREE from 'three'
import { GraphicsEngine } from "../../../../engine/src/systems/graphics/GraphicEngine.js"
import { Vector2 } from "three"
import { Line } from "../../../../engine/src/systems/graphics/components/3d/Line.js"
import { UIListener } from "../../../../engine/src/systems/events/components/UIListener.js"
import {Text3d } from '../../../../engine/src/systems/graphics/components/3d/Text.js'
import { ScriptingEngine } from "../../../../engine/src/systems/scripting/ScriptingEngine.js"
import { PlayerUIForm } from "../DomComponents/PlayerSelect/PlayerSelectForm.js"
import { MouseListener } from "../../../../engine/src/systems/events/components/MouseHandler.js"
import { MultiplayerStage } from "../../../../engine/src/core/MultiplayerScene.js"
import { MainScene } from "../../MainScene.js"
import { UnlockSkill } from "../../Skills/SkillNavigation.js"
type Fist = [0, "", 0, true, []]
type SkillClass = (Skill & (new() => Skill))
interface Skill {
    properties: [string,number, number, boolean, SkillClass[]]
    
}
class FistUI implements Skill {
    properties: [string,number, number, boolean, SkillClass[]] = 
    [
        
        "",
        0,
        0,
        true,
        [],
    ]
    constructor() {

    }
    
}

class SwordHalfSwingUI implements Skill {
    properties: [string,number, number, boolean, SkillClass[]] = 
    [
        
        "",
        0,
        0,
        false,
        [],
    ]
    constructor() {

    }
    
}
class UI implements Skill {
    properties: [string,number, number, boolean, SkillClass[]] = 
    [
        
        "",
        0,
        0,
        false,
        [],
    ]
    constructor() {

    }
    
}
let time = 0
export class SkillTree implements Entity {
    components: [Script , ...Component[]] 
    id?: number | undefined
    scene?: Scene | undefined
    className: string = "SKILLTREE"
    
    // Arry of unlocked skills
    constructor(set: Set<number> = new Set()) {



        let uiWidth = 1.8
        let UI = new UIComponent(uiWidth,1.5,{x:0,y: 0.1, z: -0.5},1)
        UI.texture = "/images/Background/UI/SquareUIBox.png"
        let infoBox = new UIComponent(0.3, 1.5,{x: uiWidth/2 - 0.15,y:0.1,z:0.1},1)
        infoBox.texture = "/images/Background/UI/UIBox.png"
        let imageBox = new UIComponent(0.1,0.1, {x: -0.125,y:0.2,z:0.1},1)
        imageBox.texture = "/images/Background/UI/Icons.png"
        imageBox.tileNumber = 0

        infoBox.children.push(imageBox)
        
        let unlockBox = new UIComponent(0.2,0.1, {x: -0.125,y:-0.5,z:0.1},1)
        unlockBox.color = 0xFFA500
        infoBox.children.push(unlockBox)

        let title = new Text3d()
        title.text = "Item"
        title.color = 0xffffff
        title.pos.x = -0.12
        title.pos.y = 0
        title.pos.z = 0.1
        title.fontSize = 0.015
        infoBox.children.push(title)

        let description = new Text3d()
        description.color = 0xffffff
        description.text = "Description"
        description.pos.x = -0.12
        description.pos.y = -0.05
        description.pos.z = 0.1
        description.fontSize = 0.015
        infoBox.children.push(description)

        let ExpText = new Text3d()
        ExpText.text = "EXP"
        ExpText.color = 0xffffff
        ExpText.pos.x = -0.12
        ExpText.pos.y = -0.3
        ExpText.pos.z = 0.1
        ExpText.fontSize = 0.015
        infoBox.children.push(ExpText)
        
        let script = new Script("SkillTREE", EngineType.SOCKETCLIENT)
        script.setProperty("DisplayedID", 17)
        script.setProperty("Unlocked", new Set())
        this.components = [script]





        

        let border:[number,number,number,number] = [0.15,0.4,0.15,0.15]

        for (let i = 0; i < UIDATA.length; i++) {
            let icon = new UIComponent(0.03125,0.03125,{x:UIDATA[i].posX,y: UIDATA[i].posY , z: 0.1}, 1)
            icon.texture = "/images/Background/UI/Icons.png"
            icon.tileNumber = UIDATA[i].tileNum
            icon.border = border
            
            UI.children.push(icon)
            // Create Line from  each icon to children icon
            for (let childIdx = 0; childIdx < UIDATA[i].children.length; childIdx++) {
                let dx = (UIDATA[i].children[childIdx].posX - UIDATA[i].posX)
                let dy = (UIDATA[i].children[childIdx].posY - UIDATA[i].posY)
                let posX = (UIDATA[i].children[childIdx].posX + UIDATA[i].posX) * 0.5
                let posY = (UIDATA[i].children[childIdx].posY + UIDATA[i].posY) * 0.5 
                let lineLength =   Math.sqrt(dx * dx + dy * dy)
                let angle = Math.atan(dy/dx)
                let line = new Line()
                line.border = border
                line.rot = angle
                line.length = lineLength - 0.08
                line.pos.x = posX
                line.pos.y = posY
                line.pos.z = 0.1
                line.color = 0xffff00
                UI.children.push(line)

            }
            
            
            let frame = new UIComponent(0.04,0.04,{x:UIDATA[i].posX,y: UIDATA[i].posY , z: 0.1}, 1)
            frame.border = border
            frame.texture = "/images/Background/UI/UIBox.png"
            if (set.has(UIDATA[i].SkillID)) {
                frame.color = 0xffff00
            }
            
            UI.children.push(frame)
            let boundingBox = {
                pos: {x: frame.pos.x,y:frame.pos.y + 0.1,z:frame.pos.z},
                dim: frame.boundingBox.dim,
                rot: 0
            }
            let button = new UIListener(frame.boundingBox, () => {
                let e = this.scene?.querySystem<ScriptingEngine>(ScriptingEngine, "SCRIPTING")
                let uiList = e?.queryClass("UIForm")
                imageBox.tileNumber = UIDATA[i].tileNum
                script.setProperty("DisplayedID", UIDATA[i].SkillID)
                imageBox.updateTexture(imageBox.texture)
                title.text = UIDATA[i].title
                title.updateText()
                description.text = UIDATA[i].description
                description.updateText()
                ExpText.text = "Exp: " + UnlockSkill(UIDATA[i].SkillID)
                ExpText.updateText()
                if (uiList) {
                    for (let uiElement of uiList) {
                        let ui  = this.scene?.entities.get(uiElement.entity as number)
                        
                        if (ui) {
                            let u = ui as PlayerUIForm
                            let uiScript = u.components[0]

                            

                            // TODO: Switch item inventory only if unlocked
                            let unlockedSet = uiScript.get("Unlocked")
                            if (unlockedSet.has(UIDATA[i].SkillID)) {
                                let selectedIdx = uiScript.get("Selected")
                                let skillList = uiScript.get("Skills")
                                frame.color = 0xFFFF00
                                frame.updateTexture(frame.texture)
                                skillList[selectedIdx] = UIDATA[i].SkillID
                                let c = u.components[1].children[selectedIdx] as UIComponent 
                                c.tileNumber = UIDATA[i].tileNum
                                c.updateTexture(c.texture)
                                
                            }
                            

                        }
                    }
                } 
            })
            button.offset[1] = 0.1
            this.components.push( button)
            
        }
        UI.children.push(infoBox)



        let uiListener = new UIListener(UI.boundingBox,(event) => {
            for (let i of UI.children) {
                i.update(0)
            }
            if (event.type == "click") {
                let dx = (event.clientX / (window.innerWidth)) * 2  - 1
                let dy = - (event.clientY / (window.innerHeight)) * 2 + 1
                if (dx < 0.5) {
                    for (let i = 0; i < UI.children.length - 1 ;i++) {
                    
                        
                        UI.children[i].pos.x -= dx * 0.9
                        UI.children[i].pos.y -= dy * 0.75 + 0.1
                        
                    }
                } else {
                    let minX = 0.625 - 0.0504
                    let maxX = 0.625 + 0.0504
                    let minY = -0.3 - 0.1125
                    let maxY = -0.3 + 0.1125
                    if (dx >= minX && dx <= maxX && dy >= minY && dy <=maxY) {
                        console.log("Unlocking skill")
                        if (MainScene.SocketHandler) {
                            
                            MainScene.SocketHandler.queueEvent({
                                event: "Unlock",
                                data: script.get("DisplayedID") 
                            })
                        } else  {
                            console.log("Unlock Listener Not found")
                        }
                    }
                }
            }
            
            
        })

        

        


        this.components.push(UI,uiListener)

    }
    createSkillComponent(skill:SkillClass, unlockedSkills: Set<number>) {

    }
    
}

