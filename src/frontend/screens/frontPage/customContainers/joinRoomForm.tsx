import React from "react";

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
    return (
        <form  method="POST" action='/play' style={formStyle} >

                        <label style={labelStyle}>Player Name</label>

                        <input className="playerName" name="playerName" type="text" required/>

                        <label style={labelStyle} >Room Number</label>

                        <input className="roomNumber" name="roomID" type="text" required />


                    <input className="Play" type="submit" value="Play"/>
            </form>
    )
}