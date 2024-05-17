import { TimedSpriteSheet } from "../../../../engine/src/systems/graphics/components/2d/Spritesheet.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component, SocketListener } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Transform } from "../../../../engine/src/systems/physics/components/transform.js";
import { MouseListener } from "../../../../engine/src/systems/events/components/MouseHandler.js";
import { Camera } from "../../../../engine/src/systems/graphics/components/2d/Camera.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";

import { KeyboardListener } from "../../../../engine/src/systems/events/components/KeyboardHandler.js";
import { MainScene } from "../../MainScene.js";
import { BoxCollider } from "../../../../engine/src/systems/Collision/components/Collider.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { MultiplayerSyncronizer } from "../../../../engine/src/systems/MultiplayerClient/components/Syncronizer.js";
import { Vector3 } from "../../../../engine/src/types/components/physics/transformType.js";
import { lerp } from "../../../../engine/src/math/Vector.js";
import { Fireball } from "../Attacks/Fireball.js";
import { Action, Item, ProjectileComponent } from "./Items.js";

export class FireWandItem implements Item {
    itemID: number = 1;

    use(script: Script): void {
        let Direction = script.properties.get("Direction")
        let Position = script.properties.get("Position")
        let Owner = script.properties.get("Owner")
        if (Direction && Position && Owner) {
            let item = {
                x: Position.x,
                y: Position.y,
                z: Position.z

            }
            let fireball = new Fireball(Owner, Direction)
            script.system.sceneManager.getCurrentScene().addEntity(fireball)
        }
    }

    

    
}

