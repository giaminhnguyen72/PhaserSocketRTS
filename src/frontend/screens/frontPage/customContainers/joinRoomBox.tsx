import React, { useState } from "react";
import { HorizontalContainer } from "../../../components/containers/header.js";
import { SwitchFormButton } from "../customComponents/SwitchFormButton.js";
import { CreateRoomForm } from "./createRoomForm.js";
import { InstructionBox } from "./InstructionContainer.js";
import { GameList, JoinRoomForm } from "./joinRoomForm.js";
function FormHandler(props:any) {

    return (
    <HorizontalContainer 
        height={"30%"} 
        width={"100%"}
        justifyContent={"center"}
        alignment={"center"}
    >
        <SwitchFormButton onClick={() => {props.setMode(0); console.log(props.mode)}} mode={props.mode}>
            Join Room
        </SwitchFormButton>
        <SwitchFormButton onClick={() => {props.setMode(1); console.log(props.mode)}} mode={props.mode}>
            Create Room
        </SwitchFormButton>
    </HorizontalContainer>
    )
}
export function JoinRoomContainer(props: any) {
    var style: Object = {
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor:  "#259E25",
        border: "28px solid  #259E25",
        marginTop: "12.5%",
        borderRadius: "10px",
        justifySelf: "center",
        alignment: "center",
        height: "70%",
        width: "70%",
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
    var [mode, setMode] = useState(0)
    if (mode == 1) {
        return  (
            <div style={style}> 
                <FormHandler mode={mode} setMode={setMode}/>
                <CreateRoomForm/>


            </div>
        )
    } else {
        return (
            <div style={style}> 
            <FormHandler mode={mode} setMode={setMode}/>
            <GameList/>


        </div>
        )
        
    }
}
