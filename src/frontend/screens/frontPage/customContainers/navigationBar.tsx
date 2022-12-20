
import React, { useState } from 'react';

import { DefaultHeader, HorizontalContainer } from '../../../components/containers/header.js';
import { NavigationButton } from '../customComponents/navigationButton.js';
export function NavigationBar(props: any) {
    var childrenColor = "green"
    var labelColors = {
        backgroundColor: undefined, color:"white"
    }
    return (
        <DefaultHeader height={"5%"} justifyContent={"space-around"}>
            <HorizontalContainer 
                height={"100%"} 
                width={"60%"}
                justifyContent={"center"}
            >
                <NavigationButton>Home</NavigationButton>
                <NavigationButton>Lobby</NavigationButton>
                <NavigationButton>Community</NavigationButton>
            </HorizontalContainer>
            
        </DefaultHeader>
    
    )
}