import { Component } from "react";
import { MouseEmitter, MouseEmitter3d, MouseListener } from "../../engine/src/systems/events/components/MouseHandler.js";
import { EngineType } from "../../engine/src/constants/engineType.js";
import { SceneConfig } from "../../engine/src/core/config.js";
import { SceneManager } from "../../engine/src/core/managers/SceneManager.js";
import { Stage } from "../../engine/src/core/scene.js";
import { KeyBoardEmitter, KeyboardListener } from "../../engine/src/systems/events/components/KeyboardHandler.js";
import { SocketClient } from "../../engine/src/systems/MultiplayerClient/components/SocketClientHandler.js";
import { SocketManager } from "../../engine/src/systems/MultiplayerClient/SocketManager.js";
import { Entity } from "../../engine/src/types/Entity.js";
import { Label } from "./entities/Label.js";


import { Templar } from "./entities/Templar.js";
import { Knight} from "./entities/Player/Knight.js";
import { SwordAttack } from "./entities/SwordAnim.js";
import { Grass } from "./entities/background/Grass.js";
import { OrthographicCamera3d } from "../../engine/src/systems/graphics/components/3d/OrthographicCamera3d.js";
import * as THREE from 'three'
import { PhysicsEngine } from "../../engine/src/systems/physics/PhysicsEngine.js";
import { Transformable } from "../../engine/src/types/components.js";
import { PlayerUIForm } from "./entities/DomComponents/PlayerSelect/PlayerSelectForm.js";
import { Script } from "../../engine/src/systems/scripting/components/Script.js";
import { Fireball } from "./entities/Attacks/Fireball.js";
import { BasicAxe } from "./entities/Attacks/BasicAxe.js";
import { Fist } from "./entities/Attacks/Fist.js";
import { SwordSwing } from "./entities/Attacks/SwordSwing.js";
import { SwordSlash } from "./entities/Attacks/SwordSlash.js";
import { Transform } from "../../engine/src/systems/physics/components/transform.js";
import { TimedSpriteSheet } from "../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Bear } from "./entities/Mobs/Bear.js";
import { getDirection } from "../../engine/src/math/Vector.js";
import { TimedSpriteSheet3d } from "../../engine/src/systems/graphics/components/3d/SpriteSheet3d.js";
import { CandoWisp } from "./entities/Mobs/Candowisp.js";
import { DarkMage } from "./entities/Mobs/DarkMage.js";
import { EarthEater } from "./entities/Mobs/EarthEater.js";
import { EarthTortoise } from "./entities/Mobs/EarthTortoise.js";
import { Gargoyle } from "./entities/Mobs/Gargoyle.js";
import { GiantRat } from "./entities/Mobs/GiantRat.js";
import { GiantSpider } from "./entities/Mobs/GiantSpider.js";
import { MindFlayer } from "./entities/Mobs/MindFlayer.js";
import { Skeleton } from "./entities/Mobs/Skeleton.js";
import { Snake } from "./entities/Mobs/Snake.js";
import { WilloWisp } from "./entities/Mobs/WilloWisp.js";
import { Wolf } from "./entities/Mobs/Wolf.js";
import { Arrow } from "./entities/Attacks/Arrow.js";
import { BasicIce } from "./entities/Attacks/BasicIce.js";
import { DarkOrb } from "./entities/Attacks/DarkOrb.js";
import { HealBall } from "./entities/Attacks/HealBall.js";
import { Earthquake } from "./entities/Attacks/Earthquake.js";
import { Web } from "./entities/Attacks/Structures/Web.js";
import { Icicle } from "./entities/Attacks/Icicle.js";
import { Snowball } from "./entities/Attacks/Snowball.js";
import { TileSheet3d } from "../../engine/src/systems/graphics/components/3d/TileSheet3d.js";
import { Data } from "ws";
import { MappedContainer } from "../../engine/src/systems/scripting/types/Containers.js";
import { Collision } from "./Events/Events.js";
import { Goblin } from "./entities/Mobs/Goblin.js";
import { Droid } from "./entities/Mobs/Droid.js";
import { EvilAngel } from "./entities/Mobs/EvilAngel.js";
import { HimalayanMuscox } from "./entities/Mobs/HimalayanMuscox.js";
import { Orc } from "./entities/Mobs/Orc.js";
import { Snowmon } from "./entities/Mobs/Snowmon.js";
import { SkillTree } from "./entities/UI/SkillTree.js";
import { TextureResource, TilesheetResource } from "../../engine/src/systems/graphics/components/3d/Texture.js";
import { UIOFFSETS } from "./entities/UI/UIConstants.js";
import { Bandage } from "./entities/Attacks/Bandage.js";
import { EnergyBlast } from "./entities/Attacks/EnergyBlast.js";
import { Windslash } from "./entities/Attacks/WindSlash.js";
import { Bubble } from "./entities/Attacks/Bubble.js";

import { Knife } from "./entities/Attacks/Knife.js";
import { Stone } from "./entities/Attacks/Stone.js";
import { Barricade } from "./entities/Attacks/Barricade.js";
import { Rocket } from "./entities/Attacks/Rocket.js";
import { Text3d } from "../../engine/src/systems/graphics/components/3d/Text.js";
import { ScriptingEngine } from "../../engine/src/systems/scripting/ScriptingEngine.js";
import { GamePlayer } from "./entities/Mobs/Player.js";
import { GameOver } from "./entities/DomComponents/PlayerSelect/GameOver.js";
import { FireBlast } from "./entities/Attacks/Fireblast.js";
import { Slowball } from "./entities/Attacks/Slowball.js";
import { Lightning } from "./entities/Attacks/Lightning.js";
import { Firebulb } from "./entities/Attacks/Firebulb.js";
import { GreatAxe } from "./entities/Attacks/AxeSwing.js";
import { LavaPool } from "./entities/Attacks/LavaPool.js";

export class MainScene extends Stage {
    sceneConfig: SceneConfig
    sceneManager!: SceneManager;
    background?: string | undefined;
    time: number = 0;
    engineComponents: Map<string, Map<number, Component>> = new Map();
    static SocketHandler: SocketClient
    constructor(sceneManager: SceneManager, entities: Entity[]) {
         super("MainScene", {xMin: -1024, xMax: 1024, yMin: -1024, yMax: 1024, zMin: -10000, zMax: 10000 })
         this.sceneConfig = new SceneConfig(entities)
        this.sceneManager = sceneManager

        let t = this.sceneManager.addResource<TilesheetResource>(TilesheetResource, "/images/Background/UI/Icons.png")
        t.offsets = UIOFFSETS
        t.imageDim = [640,640]
        this.sceneManager.addResource<TextureResource>(TextureResource, "/images/Background/UI/UIBox.png")
        let offsets = [{x:0, y:5/8, width:16,height:16},{x:0, y:0, width:16,height:16},{x:0, y:7/8, width:16,height:16},{x:0, y:5/8, width:16,height:16},{x:0, y:0, width:32,height:32},{x:0.25, y:0, width:32,height:32}]
        let tile = new TileSheet3d("/images/Background/tileset.png",{pos: {x:0, y:0, z:-1}, dim:{length: (this.worldBounds.xMax - this.worldBounds.xMin) * 2, height: 2* (this.worldBounds.yMax - this.worldBounds.yMin)}, rot: 0}, 
        128, 128, 64,64, offsets
        )
        for(let i = 0; i < tile.spriteMap.length; i++) {
            for (let j = 0; j < tile.spriteMap[i].length;j++) {
                let tileNumber= Math.floor (Math.random() * 2)
                if (tileNumber <=0) {
                    tile.setTile(j,i,4)
                } else {
                    tile.setTile(j,i,5)
                }
                
            }
        }

        
        

    
         let camera = new OrthographicCamera3d(2000,1000 , {x:0, y:0, z:50})
         //let UIForm = new PlayerUIForm()
         //this.sceneConfig.entities.push( UIForm)
         camera.visible = true
         let script = new Script("MainScene", EngineType.SOCKETCLIENT)
         script.properties.set("Position", camera.pos)
         script.properties.set("Following", 0)
         script.properties.set("Component", 0)
         script.properties.set("UIFormID", 0)
         script.properties.set("UIToggled", false)
        script.setInit((engine) => {
            engine.addContainer<Collision, MappedContainer<Collision>>(Collision, MappedContainer<Collision>)
            console.log("Cookie is " +  document.cookie)
            
            let e = this.addEntity(new PlayerUIForm())
            script.properties.set("UIFormID", e.id)

        })
         script.setCallBack((dt) => {
            let Following = script.properties.get("Following")
            let Sprite = script.system.queryClass("SpriteSheet")
            
            if (Sprite) {
                
                for (let i of Sprite) {
                    let entity = this.entities.get(i.entity as number)

                    let idx = i.properties.get("Graphics")
                    let direction = i.properties.get("Direction")
                    
                    if (direction && entity && idx != null && idx != undefined) {

                        let spritesheet = entity.components[idx] as TimedSpriteSheet3d

                        if (direction.x < 0) {

                            spritesheet.row = 1
                        } else {

                            spritesheet.row = 0
                        }

                    } 
                        
                }
            }

            if (Following) {
                let entity = this.entities.get(Following)
                let component = script.properties.get("Component")
                let sys = this.sceneManager.queryEngine<ScriptingEngine>("SCRIPTING", ScriptingEngine)
                if (sys && entity) {
                    for (let i of entity.components) {
                        let playerScript = sys.components.get(i.componentId as number)
                        if (playerScript) {
                            let updateUI = playerScript.get("UpdateUI")
    
                            if (updateUI === true) {
                                let formID = script.getProperty("UIFormID")
                                let uiForm = this.entities.get(formID) as PlayerUIForm
                                

                                let gamePlayer = entity as GamePlayer
                                let hp = gamePlayer.components[2].get("HP")
                                let stamina =  gamePlayer.components[2].get("Stamina")
                                let exp =  gamePlayer.components[2].get("EXP")
                                let uiComponent =  uiForm.components[3].children as Text3d[]


                                uiComponent[0].text = "HP: " + hp
                                uiComponent[0].updateText()
                                uiComponent[1].text = "Stamina: " + stamina
                                uiComponent[1].updateText()
                                uiComponent[2].text = "EXP: " + exp
                                uiComponent[2].updateText()
                                // uiForm.components[3].text = "HP: " + hp
                                // uiForm.components[3].updateText()
                                // uiForm.components[4].text = "Stamina: " + stamina
                                // uiForm.components[4].updateText()
                                // uiForm.components[5].text = "EXP: " + exp
                                // uiForm.components[5].updateText()
                                playerScript.set("UpdateUI", false)
                            }
                        }
                    } 

                }
                if (entity && component == 0) {
                    for (let i of entity.components) {
                        
                        if (i instanceof Transform) {

                            script.properties.set("Component", i.componentId)
                        }
                        
                    }
                }
            }
            let sys = this.sceneManager.queryEngine<PhysicsEngine>("PHYSICS", PhysicsEngine)
            let component = script.properties.get("Component")
            if (sys && component) {
                let transform = sys.components.get(component)
                if (transform) {
                    camera.pos.x = transform.pos.x
                    camera.pos.y = transform.pos.y
                }
                

            }
        })
         let socket = new SocketClient(this,
             {   "connect": () => {
                 console.log("connected")
                 let roomId: string = window.location.pathname
                 let roomArr: string[]  = roomId.split("/")
                 SocketManager.getInstance().emit("joined", window.sessionStorage.getItem("PlayerName"), roomArr[roomArr.length-1])
 
                 console.log("emitting")
                 
                 //engine.start(2000)
                 },
                 "disconnect": () => {
                     
                 },
                 "PlayerID": ([id, skillIDs]: [number, number[]]) =>{
                    script.properties.set("Following", id)
                    script.set("Component", 0)
                    for (let skillID of skillIDs) {
                        let scriptingEngine = this.querySystem<ScriptingEngine>(ScriptingEngine, "SCRIPTING")
                        if (scriptingEngine) {
                            let u = scriptingEngine.queryClass("UIForm")
                            if (u) {
                                for (let i of u) {
                                    let unlockedSkills = i.get("Unlocked")
                                    unlockedSkills.add(skillID)
                                }
                            }
                            
                        }
                    }
                    
                 },
                 "UnlockSkill": (id:number) => {
                    let scriptingEngine = this.querySystem<ScriptingEngine>(ScriptingEngine, "SCRIPTING")
                    if (scriptingEngine) {
                        let u = scriptingEngine.queryClass("UIForm")
                        if (u) {
                            for (let i of u) {
                                let unlockedSkills = i.get("Unlocked")
                                unlockedSkills.add(id)
                            }
                        }
                        
                    }
                 },
                 "Dead": (id:number) => {
                    console.log(id)
                    if (id == script.properties.get("Following")) {
                        this.addEntity(new GameOver())
                    }
                    
                    
                 }
                 
                 
                 
             }
 
 
             , {engineType: EngineType.SOCKETCLIENT})
             MainScene.SocketHandler = socket
        let keyEmitter = new KeyBoardEmitter(EngineType.SOCKETCLIENT)
        let keyListener = new KeyboardListener({
            "keydown": (key) => {
                if (key.key ==" ") {
                    let isToggled = script.get("UIToggled")
                    if (isToggled == 0) {
                        let skillTree = new SkillTree()
                        let scriptingEngine = this.querySystem<ScriptingEngine>(ScriptingEngine, "SCRIPTING")
                        if (scriptingEngine) {
                            let u = scriptingEngine.queryClass("UIForm")
                            if (u) {
                                for (let i of u) {
                                    let unlockedSkills = i.get("Unlocked")
                                    skillTree = new SkillTree(unlockedSkills)
                                }
                            }
                            
                        }
                        let e = this.addEntity(skillTree)
                        script.set("UIToggled", e.id)
                    } else {
                        this.removeEntity(isToggled)
                        script.set("UIToggled", 0)
                    }

                } else if (key.key == "w"  || key.key == "a" || key.key == "s" || key.key == "d") { 
                    socket.queueEvent({
                        event:"keydown",
                        data: key.key
                    })
                }
                
            }
        })
        let mouseEmit = new MouseEmitter3d(EngineType.SOCKETCLIENT)
        let mouseListener = new MouseListener(
            {
                "click": (event) => {
                    console.log("Click has been registered")
                    let vector = new THREE.Vector3();
                    vector.set(
                    (event.clientX / (window.innerWidth)) * 2  - 1,
                    - (event.clientY / (window.innerHeight)) * 2 + 1,
                    0);
                    let vecd =vector.unproject(camera.component);
                    let position = {
                        x: vector.x,
                        y: vector.y,
                        z:0
                    }

                    if (event.shiftKey) {
                        let scriptinSystem = this.querySystem<ScriptingEngine>(ScriptingEngine, "SCRIPTING")
                        if (scriptinSystem) {
                            let UiSet = scriptinSystem.queryClass("UIForm")
                            if (UiSet) {
                                for (let ui of UiSet) {
                                    let selected = ui.getProperty("Selected")
                                    let Skills = ui.getProperty("Skills")
                                    let dx = (event.clientX / (window.innerWidth)) * 2  - 1
                                    let dy = - (event.clientY / (window.innerHeight)) * 2 + 1
                                    let dir = getDirection({x:0,y:0,z:0},{x:dx,y:dy,z:0})
                                    socket.queueEvent({
                                        event: "Skill",
                                        data: [Skills[selected],dir.x, dir.y]
                                    })
                                }
                            }

                        }

                    } else {
                        socket.queueEvent({
                            event: "click",
                            data: position
                        })
                    }


                    
                }
            }
        )


         socket.addClass<Templar>("Templar", Templar)
         
         socket.addClass<Label>("Label", Label)
         socket.addClass<SwordAttack>("SWORDANIM", SwordAttack)
         socket.addClass<Knight>("KNIGHT", Knight)
         socket.addClass<GamePlayer>("PLAYER", GamePlayer)


         socket.addClass<SwordSwing>("SWORDSWING", SwordSwing)
         socket.addClass<SwordSlash>("SWORDSLASH", SwordSlash)
         socket.addClass<Bear>("BEAR", Bear)
         socket.addClass<CandoWisp>("CANDOWISP", CandoWisp)
         socket.addClass<DarkMage>("DARKMAGE", DarkMage)
         socket.addClass<EarthEater>("EARTHEATER", EarthEater)
         socket.addClass<EarthTortoise>("EARTHTORTOISE", EarthTortoise)
         socket.addClass<Gargoyle>("GARGOYLE", Gargoyle)
         socket.addClass<GiantRat>("GIANTRAT", GiantRat)
         socket.addClass<GiantSpider>("GIANTSPIDER", GiantSpider)
         socket.addClass<MindFlayer>("MINDFLAYER", MindFlayer)
         socket.addClass<Skeleton>("SKELETON",Skeleton)
         socket.addClass<Snake>("SNAKE", Snake)
         socket.addClass<WilloWisp>("WILLOWISP", WilloWisp)
         socket.addClass<Wolf>("WOLF", Wolf)
        
         socket.addClass<Goblin>("GOBLIN", Goblin)
         socket.addClass<Droid>("DROID", Droid)
         socket.addClass<EvilAngel>("EVILANGEL", EvilAngel)
         socket.addClass<HimalayanMuscox>("MUSCOX", HimalayanMuscox)
         socket.addClass<Orc>("ORC", Orc)
         socket.addClass<Snowmon>("SNOWMON", Snowmon)

         socket.addClass<Arrow>("ARROW", Arrow)
         socket.addClass<BasicAxe>("BASICAXE", BasicAxe)
         socket.addClass<BasicIce>("BASICICE", BasicIce)
         socket.addClass<DarkOrb>("DARKORB", DarkOrb)
         socket.addClass<Earthquake>("EARTHQUAKE", Earthquake)
         socket.addClass<Fireball>("FIREBALL", Fireball)
         socket.addClass<Fist>("FIST", Fist)
         socket.addClass<HealBall>("HEALBALL", HealBall)
         socket.addClass<Web>("WEB", Web)
         socket.addClass<Icicle>("ICICLE", Icicle)
         socket.addClass<Snowball>("SNOWBALL", Snowball)
         socket.addClass<Bandage>("BANDAGE", Bandage)
         socket.addClass<EnergyBlast>("ENERGYBLAST", EnergyBlast)
         socket.addClass<Windslash>("WINDSLASH", Windslash)
         socket.addClass<GreatAxe>("GREATAXE", GreatAxe)
         socket.addClass<Bubble>("BUBBLE", Bubble)
         socket.addClass<Knife>("KNIFE", Knife)
         socket.addClass<Stone>("STONE", Stone)
         socket.addClass<FireBlast>("FIREBLAST", FireBlast)
         socket.addClass<Barricade>("BARRICADE", Barricade)
         socket.addClass<Firebulb>("FIREBULB", Firebulb)
         socket.addClass<Rocket>("ROCKET", Rocket)
         socket.addClass<Slowball>("SLOWBALL", Slowball)
         socket.addClass<Lightning>("LIGHTNING", Lightning)
         socket.addClass<LavaPool>("LAVAPOOL", LavaPool)

         this.components.push(socket, keyEmitter, keyListener, mouseEmit, mouseListener, camera, script, tile)
  
     }
     getSceneConfig() {
         this.sceneConfig.entities.push(this)
         return this.sceneConfig 
     }
 
 }