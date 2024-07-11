import React from "react"
export function DefaultHeader(props:any) {
    var style: Object = {
        width: "100%",
        height: props.height != undefined ? props.height :undefined,
        backgroundColor: props.backgroundColor != undefined ? props.backgroundColor : undefined,
        alignItems: "center",
        alignContent: "center",
        justifyContent: props.justifyContent,
        flexDirection: "horizontal",
        display: "flex",
        color:"green",
        paddingTop: "5%"
        
    }
    return (
        <div style={style}>{props.children}</div>
    )
}
export function FlexContainer(props: any) {
    
    var style = {
        height: props.height,
        width: props.width,
        flexDirection: props.flexDir,
        display: "flex",
        backgroundColor: props.color,
        borderColor: props.color,
        alignItems: props.alignment,
        alignContent: props.alignment,
        justifyContent: props.justifyContent,
        border: props.border
    }
    return (
        <div style={style}>{props.children}</div>
    )
}
export function HorizontalContainer(props: any) {
    var alignment = props.alignment != undefined ? props.alignment : "center"
    var justifyContent = props.justifyContent != undefined ? props.justifyContent : "center"
    var radius = props.borderRadius != undefined ? props.borderRadius : 0
    return (
        <FlexContainer
            height={props.height}
            width={props.width}
            color={props.color} 
            flexDir={"horizontal"}
            alignment={alignment}
            justifyContent={justifyContent}
            border={props.border}
            borderRadius={radius}
        >
            {props.children}
        </FlexContainer>
    )
}
export function VerticalContainer(props: any) {
    var alignment = props.alignment != undefined ? props.alignment : "center"
    var justifyContent = props.justifyContent != undefined ? props.justifyContent : "center"
    var radius = props.borderRadius != undefined ? props.borderRadius : 0
    
    return (
        <FlexContainer 
            height={props.height}
            width={props.width}
            color={props.color} 
            flexDir={"vertical"}
            alignment={alignment}
            justifyContent={justifyContent}
            borderRadius={radius}
            border={props.border}
        >
            {props.children}
        </FlexContainer>
    )
}