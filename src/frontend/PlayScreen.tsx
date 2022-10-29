import React, { StrictMode } from 'react';

import LoginBox from './App.js'
import { PlayForm } from './components/forms/CreateGameForm.js';
function StartScreen(props: any) {
    return (
        <div className="StartScreen">
            <Title/>
            <CenterBox/>
        </div>

    )
}
function CenterBox(props: any) {
    return (
        <div className="CenterBox">
            <Box/>
            <LoginBox/>
        </div>
        
    );
}


function Title(props: any) {
    return (
        <div className="TitleDiv">
            <label className="Title">Title</label>
            <button>Play</button>
            <button>Login</button>
        </div>
    )

}
function Box(props: any) {
    return (
        <div className="Box">
            <PlayForm/>
        </div>
    )
}
