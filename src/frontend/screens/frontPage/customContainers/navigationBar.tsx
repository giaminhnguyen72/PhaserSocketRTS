
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
        <DefaultHeader height={"20%"}  >
            <HorizontalContainer 
                height={"80%"} 
                width={"100%"}
                justifyContent={"center"}
                color=  {"#259E25"}
                alignment={""}

            >
                <h1 style={labelColors}>Quandary</h1>
                {/* <NavigationButton>Home</NavigationButton>
                <NavigationButton>Lobby</NavigationButton>
                <NavigationButton>Community</NavigationButton> */}
            </HorizontalContainer>
            
        </DefaultHeader>
    
    )
}