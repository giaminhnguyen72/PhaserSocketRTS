import React from "react"
export function InstructionBox(props: any) {
    var style: Object = {
        display: "flex",
        alignSelf: "center",
        backgroundColor:  "#259E25",
        border: "28px solid  #259E25",
        marginTop: "12.5%",
        borderRadius: "10px",

        height: "70%",
        width: "30%",
        flexDirection: "column"
        
        
    }
    var labelStyle: React.CSSProperties = {

        textAlign: "center",
        fontSize: "1.5vw",
        color: 'white',
        paddingTop: "12.5%"
        
    }
    var textStyle: React.CSSProperties = {
        textAlign: "center",
        fontSize: "1.1vw",
        color: 'white',
        paddingTop: "12.5%"
        
    } 
    return <div id="Instructions"  style={style} >
        <label style={labelStyle}>Instructions</label>
        <div style={textStyle}>
            Click to move to location<br/>
            Shift + Click to Attack <br/>
            Space to Open/Close Upgrade Menu<br/>
            A/D to switch weapons
        
         </div>
        

    </div>

    

    
    
}