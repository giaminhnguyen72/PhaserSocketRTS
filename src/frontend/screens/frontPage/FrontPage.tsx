

import React, { useState } from 'react';
import {CenterContainer} from './customContainers/centerContainer.js'
import {NavigationBar} from "./customContainers/navigationBar.js"
function StartScreen(props: any) {
    return (
        <div style={{width: "100%", height: "100%", display : "flex", flexDirection: "column", alignItems: "center"
        
        }}>
            <NavigationBar/>
            <CenterContainer/>

        </div>

    )
}






export default StartScreen