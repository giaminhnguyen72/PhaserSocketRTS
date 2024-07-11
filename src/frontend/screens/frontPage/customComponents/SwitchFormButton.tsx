import React from "react";
import { DefaultButton, FlexButton } from "../../../components/buttons/button.js"
export function SwitchFormButton(props:any) {
    var flex: number = props.flex != undefined ? props.flex : 1
    var select_colors: Object[] = props.selectColor != undefined ? props.selectColor : ['green', 'red']
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
    if (props.mode == 0) {
        return (<DefaultButton
            flex={flex}
            color= {"green"}
            textColor={"white"}
            radius={"3px"}
            fontSize={"1.1vw"}
            onClick={props.onClick}
            height={"100%"}
        >
            {props.children}
        </DefaultButton>
        )
    } else {
        return (<DefaultButton 
            flex={flex}
            color= {"green"}
            textColor={"white"}
            radius={"3px"}
            fontSize={"1.1vw"}
            onClick={props.onClick}
            height={"100%"}
        >
            {props.children}
        </DefaultButton>
        )
    }
    
    
}