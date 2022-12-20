import React from "react";
import { DefaultButton, FlexButton } from "../../../components/buttons/button.js"
export function SwitchFormButton(props:any) {
    var flex: number = props.flex != undefined ? props.flex : 1
    var select_colors: Object[] = props.selectColor != undefined ? props.selectColor : ['green', 'red']
    if (props.mode == 0) {
        return (<DefaultButton
            flex={flex}
            color= {"green"}
            textColor={"white"}
            radius={"15px"}
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
            color= {"red"}
            textColor={"white"}
            radius={"15px"}
            fontSize={"1.1vw"}
            onClick={props.onClick}
            height={"100%"}
        >
            {props.children}
        </DefaultButton>
        )
    }
    
    
}