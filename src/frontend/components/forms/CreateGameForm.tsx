import React from "react"
import { useState } from "react"

export function PlayForm (props: any) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <form className="CenterForm" method="POST" action='/play/createGame'>
                <div>
                    <label>Game Name</label>
                
                    <input className="gameName" type="text" name="gameName" required></input>
                </div>
                <div>
                    <label>Player Name</label>
                
                    <input className="playerName" type="text" name="playerName" required></input>
                </div>
                
                <button className="Play" type="submit" value="CreateGame">Submit</button>
            </form>
        </div>
    )

}