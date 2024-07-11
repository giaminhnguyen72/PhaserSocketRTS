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
import { MainScene } from "../../../../../GameFrontend/scenes/MainScene.js";

export class GameOver implements Entity{
    components: [UIComponent, UIListener ] ;
    id?: number | undefined;
    scene!: Scene ;
    className: string = "GameOver";
    constructor() {
        let gameOverPanel = new UIComponent(1,0.8,{x:0,y: 0.1, z: -0.5},1)
        gameOverPanel.texture = "/images/Background/UI/SquareUIBox.png"

        let respawnButton = new UIComponent(0.8,0.3,{x:0,y:-0.1,z:0.1},1)
        respawnButton.color = 0xf05e16
        gameOverPanel.children.push(respawnButton)

        let gameOVerText= new Text3d()
        gameOVerText.pos.y = 0.18
        gameOVerText.pos.z = 0.1
        gameOVerText.color = 0xffffff
        gameOVerText.text = "Game Over"
        gameOVerText.fontSize = 0.1

        let respawnText = new Text3d()
        respawnText.pos.y = -0.1
        respawnText.pos.z = 0.2
        respawnText.color = 0xffffff
        respawnText.text = "Respawn"
        respawnText.fontSize = 0.05

        gameOverPanel.children.push(gameOVerText, respawnText)
        let func = () => {

            MainScene.SocketHandler.emit({event: "Respawn", data: true})
            this.scene.removeEntity(this.id as number)
        }
        let listener = new UIListener({pos:{x:0,y:0,z:-0.2},dim: {length: 0.8, height: 0.24},rot:0},func)
        this.components= [gameOverPanel, listener]

    }


}