import React, { useLayoutEffect, useRef, useState } from 'react';

function roundedInput(props:any) {
    const inputRef = useRef(null)
    useLayoutEffect(() => {

    }, [])
    var type = props.type == null ? "text" : props.type
    var radius = props.radius == null ? "12px" : props.radius
    return <input type={type} ref={inputRef}>{props.children}</input>
}
export {roundedInput}