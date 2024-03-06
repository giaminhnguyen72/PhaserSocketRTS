import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { Templar } from "../Templar.js";
import { Action, Item, ProjectileComponent } from "./Items.js";
export class NoItem implements Item {
    itemID: number = 0;
    src: string = "";
    cooldown: number = 500
    use(script: Script): void {
        let position = script.properties.get("Position")
        let Direction = script.properties.get("Direction")
        console.log("Inside")
        if (position && Direction) {
            if (Direction.x == 0 && Direction.y == 0) {

            } else {
                let templar= new Templar()
                templar.transform.vel.x = Direction.x
                templar.transform.vel.y = Direction.y
                console.log(Direction.x + " " + Direction.y)
                script.system.sceneManager.getCurrentScene().addEntity(templar)
            }
        }
    }
    
}