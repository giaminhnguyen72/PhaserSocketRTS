import React from "react"
import { useState } from "react"

export function CreateRoomForm (props: any) {
    var style: Object = {
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor:  "#259E25",
        border: "28px solid  #259E25",
        marginTop: "12.5%",
        borderRadius: "18.5%",
        justifySelf: "center",
        alignment: "center",
        height: "50%",
        width: "30%",
        flexDirection: "column"
        
        
    }
    var formStyle: Object = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: "column",
        height: "100%",
        marginTop: "10%"
    }
    var labelStyle: Object = {
        textAlign: "center",
        fontSize: "1.5vw",
        color: 'white'
    }

    const [playerName, setPlayerName] = useState("")
    const storeFormData = () => {
        window.sessionStorage.setItem("PlayerName", playerName)
        window.sessionStorage.setItem("RoomNumber", "")
    }
    return (
        
            <form style={formStyle} method="POST" action='/play/createGame'>
                
                    <label style={labelStyle}>Game Name</label>
                
                    <input className="gameName" type="text" name="gameName" required />
                
            
                    <label style={labelStyle}>Player Name</label>
                
                    <input className="playerName" type="text" name="playerName" value={playerName} 
                    onChange={(e) => {setPlayerName(e.target.value)}}
                    required />
                
                
                <button className="Play" type="submit" onClick={storeFormData}>Create Game</button>
            </form>
        
    )

}