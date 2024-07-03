import { Resource } from '../../../../../../engine/src/core/Resource.js'
import * as THREE from 'three'
import { Rectangle } from '../Rectangle.js'

export class TextureResource implements Resource {
    texture: THREE.Texture
    loaded: boolean 
    path: string
    offset: [number,number] = [0,0]
    constructor(path:string, isLoaded: boolean = false) {
        this.loaded = isLoaded
        this.path = path
        let loader =  new THREE.TextureLoader()
        let loaded = loader.load(path, (data) => {
                data.magFilter = THREE.NearestFilter
                data.colorSpace = THREE.SRGBColorSpace
                data.needsUpdate = true
                this.loaded = true
                data.offset.set(this.offset[0],this.offset[1])
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
export class TilesheetResource implements Resource {
    texture: THREE.Texture
    loaded: boolean 
    path: string 
    offsets: {pos:[number,number], dim: [number, number]}[] 
    imageDim: [number,number]
    constructor(path:string, isLoaded: boolean = false, imageDim:[number, number] = [0,0], textures: {pos:[number,number], dim: [number, number]}[] = []) {
        this.loaded = isLoaded
        this.path = path
        let loader =  new THREE.TextureLoader()
        this.offsets = textures
        let loaded = loader.load(path, (data) => {
                data.magFilter = THREE.NearestFilter

                data.needsUpdate = true
                this.loaded = true
            
            }, () => {
                //console.log("progressing")
            }, () => {
                throw new Error("Picture failed to load")
            })
        this.texture = loaded
        this.imageDim = imageDim
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
    copy(imageDim:[number, number] = [0,0], textures: {pos:[number,number], dim: [number, number]}[] = []) {
        this.imageDim = imageDim
        this.offsets=textures
    }
    createTile(idx: number) {
        let newTexture = this.texture.clone()
        if (idx < 0 || idx >= this.offsets.length) {
            return undefined
        }
        newTexture.colorSpace = THREE.SRGBColorSpace
        let offset = this.offsets[idx]
        
        newTexture.repeat.set(offset.dim[0]/this.imageDim[0],offset.dim[1]/this.imageDim[1])
        newTexture.offset.set(offset.pos[0], offset.pos[1])
        return newTexture

    }
}
    

