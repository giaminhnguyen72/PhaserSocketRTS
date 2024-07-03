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
import { ScriptingEngine } from "../../../../engine/src/systems/scripting/ScriptingEngine.js"
import { PlayerUIForm } from "../DomComponents/PlayerSelect/PlayerSelectForm.js"
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


