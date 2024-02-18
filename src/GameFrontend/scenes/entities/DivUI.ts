
import { Button, ImageButton } from "../../../engine/src/systems/graphics/components/DomElement/Button.js";
import { Div } from "../../../engine/src/systems/graphics/components/DomElement/Div.js";
import { Scene, Stage } from "../../../engine/src/core/scene.js";
import { Component } from "../../../engine/src/types/components.js";
import { Entity } from "../../../engine/src/types/Entity.js";
import { Label } from "../../../engine/src/systems/graphics/components/DomElement/Text.js";


export class DivUI implements Entity {
    components: Component[];
    id?: number | undefined;
    scene: Stage
    className: string = "DIV";
    constructor(scene: Stage) {
        this.scene = scene
        let bottomdiv = new Div("backgroundDiv","position:fixed;background-color:#1a1818;height: 60%; width: 60%;z-index: 4;top: 0;left: 0; bottom:0; right:0;margin:auto;opacity:0.6;border-radius:15px", scene)
        let templarButton = this.generateButton("0", "/images/Templar.png", "Templar")
        let KnightButton = this.generateButton("1", "/images/Knight_Forward.png", "Knight")
        let archerButton = this.generateButton("2","/images/Archer.png", "Archer")
        let priestButton = this.generateButton("3","/images/Priest.png", "Priest")
        let rogueButton = this.generateButton("4", "/images/Rogue.png", "Rogue")
        let div = new Div("identifier", "display:flex;justify-content:center;align-items:center;position: fixed;background-color:#1a1818;opacity:0.2; height: 60%; width: 60%;z-index: 5;top: 0;left: 0; bottom:0; right:0;margin:auto;opacity:0.6;border-radius:15px", scene,
                            templarButton, KnightButton, priestButton,archerButton, rogueButton)

        this.components=[bottomdiv, div]
    }
    generateButton(id: string, path:string, characterName: string) {
        let divId = "buttonDiv" + id
        let buttonId = characterName + id
        let button = new ImageButton(buttonId, "display:flex;justify-content:center;align-items:center;background-color: #1a1818", path, () =>{
            this.scene.removeEntity(this.id as number)
        })
        let text = new Label(characterName+ "label","", "h5",characterName)
        let containerDiv = new Div(divId, "display:flex;position:relative;flex-direction:column;justify-content:center;align-items: center;background-color:#1a1818;height: 100%; width: 100%;z-index: 4;border-radius:15px", this.scene,button, text)
        return containerDiv

    } 
    clone() {
        return new DivUI(this.scene)
    }
}