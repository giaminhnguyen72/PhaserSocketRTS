import React from "react"
export function DefaultButton(props:any) {

    var style: Object = {
        height: props.height,
        width: props.width,
        backgroundColor: props.color != undefined ? props.color : undefined,
        borderRadius: props.radius != undefined ? props.radius : "14%/10%",
        borderColor: props.color != undefined ? props.color : undefined,
        color: props.textColor,
        fontSize: props.fontSize,
        flex: props.flex
    }
    return (
        <button style={style} onClick={props.onClick}>{props.children}</button>
    )
}
export function FlexButton(props:any) {

    var style: Object = {
        flex: props.flex,
        backgroundColor: props.color != undefined ? props.color : undefined,
        borderRadius: props.radius != undefined ? props.radius : "14%/10%",
        borderColor: props.color != undefined ? props.color : undefined,
        color: props.textColor,
        fontSize: props.fontSize
    }
    return (
        <button style={style} onClick={props.onClick}>{props.children}</button>
    )
}