import React from "react"
import { useState } from "react"

export function defaultNavBar(props: any) {
    
    const [mode, setMode] = useState<number>(0)
    var buttonItems: any = props.items.map((buttonItem: any) =>
        <button onClick={buttonItem.onClick}>{buttonItem}</button>
    )
    return
}