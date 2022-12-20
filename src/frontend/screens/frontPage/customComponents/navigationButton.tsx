import React from "react"
import { DefaultButton } from "../../../components/buttons/button.js"

export function NavigationButton(props: any) {
    var childrenColor = "green"
    return (
        <DefaultButton 
            width={"13.33%"} 
            height={"100%"} 
            color= {"green"}
            textColor={"white"}
            radius={"15px"}
            fontSize={"0.95vw"}
        >
            {props.children}
        </DefaultButton>
    )
}