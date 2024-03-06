import { Item } from "./Items"
import { NoItem } from "./NoItem"

export function ItemFactory(id: number): Item {
    switch (id) {
        case 0:
            return new NoItem()
        default:
            throw new Error()
    }
}