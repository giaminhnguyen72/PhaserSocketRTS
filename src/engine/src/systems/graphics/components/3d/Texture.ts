import { Resource } from '../../../../../../engine/src/core/Resource.js'
import * as THREE from 'three'

export class TextureResource implements Resource {
    texture: THREE.Texture
    loaded: boolean 
    path: string 
    constructor(path:string, isLoaded: boolean = false) {
        this.loaded = isLoaded
        this.path = path
        let loader =  new THREE.TextureLoader()
        let loaded = loader.load(path, (data) => {
                data.magFilter = THREE.NearestFilter
                data.colorSpace = THREE.SRGBColorSpace
                data.needsUpdate = true
                this.loaded = true
            
            }, () => {
                //console.log("progressing")
            }, () => {
                throw new Error("Picture failed to load")
            })
        this.texture = loaded
    } 
    clone(): THREE.Texture {

        let text = this.texture.clone()
        
        return text

    }
    dispose() {
        this.texture.dispose()
    }
    loadResource() {

    }
}
    

