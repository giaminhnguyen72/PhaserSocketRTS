import { componentType } from "../constants/componentType.js"

export interface System {
    tag: string
    update(dt: number):void
}
