import React, { useEffect, useState } from "react";
import { DefaultButton } from "../../../../frontend/components/buttons/button.js";
export function GameList(props: any) {
    let arr: {RoomName: string, RoomNumber: number, PlayerCount: number}[] = []
    const [games, setGames] = useState(arr)
    useEffect(() => {
        fetch("/play/games").then(async (value) => {
            let listOfGames = await value.json()
            setGames(listOfGames)
        })
        
    })
    var formStyle: Object = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "5px",
        OverflowY: "auto"
    }
    return        ( 
    <div id="GameList"  style={formStyle} >
        <LabelRow />

        {games.map((packet) => {
            return <ListRow roomName={packet.RoomName} roomID={packet.RoomNumber} playerCount={packet.PlayerCount} />
        })}

    </div>

)
}
function LabelRow() {
    let style = {
        width: "100%",
        height: "20%",
        display:'flex',
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.2vw",


    }
    let labelStyle: React.CSSProperties = {
        color: "white",
        textAlign: 'center'
        
    }
    return <div style={style}>
        <label style={labelStyle}>Room Name</label>
        <label style={labelStyle}>Room ID</label>
        <label style={labelStyle}>Player Count</label>
        <label style={labelStyle}></label>
    </div>
}
function ListRow(props: any) {
    let style = {
        width: "100%",
        height: "20%",
        display:'flex',
        justifyContent: "space-between",
        alignItems: "center",

    }
    let labelStyle : React.CSSProperties= {
        "color": "white",
        textAlign: 'center'
    }

    return <form style={style} method="POST" action='/play'>
        
        <label style={labelStyle}>{props.roomName}</label>
        <label style={labelStyle}>{props.roomID}</label>
        <label style={labelStyle}>{props.playerCount}</label>
        <input className="playerName" name="playerName" type="hidden" 
                        value="Test"
                         required/>



        <input className="roomNumber" name="roomID" type="hidden" value={props.roomID} 

                        required />
        <DefaultButton
            color= {"green"}
            textColor={"white"}
            radius={"3px"}
            fontSize={"1.1vw"}
            onClick={props.onClick}
            height={"80%"}
        >
            Play
        </DefaultButton>

    </form>
}
export function JoinRoomForm(props: any) {
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
    const [roomID, setRoomID] = useState("")
    const storeFormData =  () => {
        window.sessionStorage.setItem("PlayerName", playerName)
        window.sessionStorage.setItem("RoomID", roomID)
    }
    return (
        <form style={formStyle} >

                        <label style={labelStyle}>Player Name</label>

                        <input className="playerName" name="playerName" type="text" 
                        value={playerName}
                        onChange={(e) => {setPlayerName(e.target.value)}} required/>

                        <label style={labelStyle} >Room Number</label>

                        <input className="roomNumber" name="roomID" type="text" value={roomID} 
                        onChange={(e) => {setRoomID(e.target.value)}}
                        required />


                    <button className="Play" type="submit" value="Play" onClick={storeFormData}> Play</button>
        </form>
    )
}