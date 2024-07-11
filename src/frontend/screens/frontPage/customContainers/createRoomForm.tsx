import React from "react"
import { useState } from "react"
import { DefaultButton } from "../../../../frontend/components/buttons/button.js"

export function CreateRoomForm (props: any) {
    var style: Object = {
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor:  "#259E25",
        border: "28px solid  #259E25",
        marginTop: "5%",
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
        marginTop: "5%"
    }
    var labelStyle: Object = {
        textAlign: "center",
        fontSize: "1.7vw",
        color: 'white'
    }
    let inputStyle ={
        borderColor: "0xA9A9A9",
        height: "10%",
        width: "40%",
        borderRadius: "5px"
    }

    const [playerName, setPlayerName] = useState("")
    const storeFormData = () => {
        window.sessionStorage.setItem("PlayerName", playerName)
        window.sessionStorage.setItem("RoomNumber", "")
    }
    return (
        
            <form style={formStyle} method="POST" action='/play/createGame'>
                
                    <label style={labelStyle}>Game Name</label>
                
                    <input style={inputStyle} className="gameName" type="text" name="gameName" required />
                
            
                    <label style={labelStyle}>Player Name</label>
                
                    <input style={inputStyle} className="playerName" type="text" name="playerName" value={playerName} 
                    onChange={(e) => {setPlayerName(e.target.value)}}
                    required />
                
                <DefaultButton
                    color= {"green"}
                    textColor={"white"}
                    radius={"3px"}
                    fontSize={"1.1vw"}
                    onClick={storeFormData}
                    height={"20%"}
                    width={"30%"}
                >
                    Create Room
                </DefaultButton>

            </form>
        
    )

}