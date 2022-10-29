

import React, { useState } from 'react';
import { PlayForm } from './components/forms/CreateGameForm.js';
import { LoginForm } from './components/forms/LoginForm.js';
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
            <JoinRoomBox/>
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
function LoginBox(props: any) {
    return (
        <div className="LoginBox">
            <label className="switch">
                <input type="checkbox" className="checkbox" />
                <div className=""></div>
            </label>

            <LoginForm/>
            <h4>or</h4>
            <h2>Use temporary Username</h2>
            <form className="tempUsernameForm" method='post' action='tempName'>
                <input className="LoginInput" type="text" required></input>
            </form>
        </div>
    )
}
function toggleButton(props: any) {
    
}

function JoinRoomBox(props: any) {
    return (
        <div className="joinRoomBox">
            
            <form className="JoinRoomForm" method="get" action='/play/:id'>
                    <div>
                        <label>Player Name</label>
                        <br></br>
                        <input className="playerName" type="text" required></input>
                        <br></br>
                        <label>Room Number</label>
                        <br></br>
                        <input className="roomNumber" type="text" required></input>

                    </div>
                    <input className="Play" type="submit" value="Play"/>
            </form>
        </div>
    )
}
export default StartScreen