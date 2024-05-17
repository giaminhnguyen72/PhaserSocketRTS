import { Sprite } from "../../../../engine/src/systems/graphics/components/2d/Sprite.js";
import { Scene } from "../../../../engine/src/core/scene.js";
import { Component } from "../../../../engine/src/types/components.js";
import { Entity } from "../../../../engine/src/types/Entity.js";
import { Script } from "../../../../engine/src/systems/scripting/components/Script.js";
import { EngineType } from "../../../../engine/src/constants/engineType.js";
import { Sprite3d } from "../../../../engine/src/systems/graphics/components/3d/Sprite3d.js";
import { TileSheet3d } from "../../../../engine/src/systems/graphics/components/3d/TileSheet3d.js";
type TextureOffset = {
    x: number,
    y: number,
    width: number,
    height: number
}
export class Grass implements Entity {
    components: Component[] = [];
    id?: number | undefined;
    scene?: Scene | undefined;
    className: string = "GRASS";
    constructor(scene?: Scene) {
        
        if (scene) {
            let rect = {
                pos: {
                    x:0,
                    y: 0,
                    z:1
                },
                dim: {
                    length: scene.worldBounds.xMax - scene.worldBounds.xMin,
                    height: scene.worldBounds.yMax - scene.worldBounds.yMin,
                },
                rot: 0
            }
            let offsets = [{x:0, y:5/8, width:16,height:16},{x:0, y:0, width:16,height:16},{x:0, y:7/8, width:16,height:16}]
            // let sprite = new TileSheet3d("/images/GrassTileSheet.png", rect, 3)
            // this.components.push(sprite)
            let tile = new TileSheet3d("/images/Background/tileset.png",{pos: {x:0, y:0, z:0}, dim:{length: scene.worldBounds.xMax - scene.worldBounds.xMin, height: scene.worldBounds.yMax - scene.worldBounds.yMin}, rot: 0}, 
            128, 128, 128,128, offsets
            )
            this.components.push(tile)
        }
        
        
        
        
        
        
    }
    clone(): Entity {
        return new Grass()
    }

}