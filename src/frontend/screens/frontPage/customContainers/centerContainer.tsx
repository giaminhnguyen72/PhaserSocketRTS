import React from 'react';
import { HorizontalContainer } from '../../../components/containers/header.js';

import {JoinRoomContainer} from "./joinRoomBox.js"


function CenterContainer(props: any) {
    var style: any= {
        display: "flex",
        alignment: "center",
        alignChildren: "center",
        alignItems: "center",
        justifySelf: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: "55%",
        height: "60%"
    }

    return (
        <HorizontalContainer width={style.width} height={style.height}>
            <JoinRoomContainer />
            
        </HorizontalContainer>
            
            

            
        
        
    );
}
export {CenterContainer}

