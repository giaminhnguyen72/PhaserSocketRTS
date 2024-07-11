
import React, { useState } from 'react';

import { DefaultHeader, HorizontalContainer } from '../../../components/containers/header.js';
import { NavigationButton } from '../customComponents/navigationButton.js';
export function NavigationBar(props: any) {
    var childrenColor = "green"
    var labelColors = {
        color:"white",
        
        justifyContent: "center",
        alignSelf:  "center",


    }
    return (
        <DefaultHeader height={"10%"} justifyContent={"space-around"}  >
            <HorizontalContainer 
                height={"80%"} 
                width={"40%"}
                justifyContent={"center"}
                color={"green"}

            >
                <h1 style={labelColors}>Quandary</h1>
                {/* <NavigationButton>Home</NavigationButton>
                <NavigationButton>Lobby</NavigationButton>
                <NavigationButton>Community</NavigationButton> */}
            </HorizontalContainer>
            
        </DefaultHeader>
    
    )
}