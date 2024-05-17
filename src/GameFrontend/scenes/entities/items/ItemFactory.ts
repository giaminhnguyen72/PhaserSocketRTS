import { FireWandItem } from "./FireWand"
import { Item } from "./Items"
import { NoItem } from "./NoItem"

export function ItemFactory(id: number): Item {
    switch (id) {
        case 0:
            return new NoItem()
        case 1:
            return new FireWandItem()
        default:
            throw new Error()
    }
}