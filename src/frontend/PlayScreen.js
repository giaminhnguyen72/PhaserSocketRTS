import React from 'react'
import './App.css';
function StartScreen(props) {
    return (
        <div className="StartScreen">
            <Title/>
            <CenterBox/>
        </div>

    )
}
function CenterBox(props) {
    return (
        <div className="CenterBox">
            <Box/>
            <LoginBox/>
        </div>
        
    );
}
function CenterForm(props) {
    return (
        <div className="CenterFormDiv">
            <form className="CenterForm">
                <div>
                    <label>User Login</label>
                    <input className="UsernameInput" type="text"></input>
                </div>
                <br/>
                <div>
                    <label>Password</label>
                    <input className="PasswordInput" type="text"></input>
                </div>
                
                <a href='/'> <input className="Submit" type="submit" value="Login"/> </a>
            </form>

        </div>
    )
}
function PlayForm (props) {
    return (
        
            <form className="CenterForm" method="get" action='/play'>
                <div>
                    <label>Play</label>
                    <input className="PasswordInput" type="text" required></input>
                    
                </div>
                <input className="Play" type="submit" value="Play"/>
            </form>
    )

}
function Title(props) {
    return (
        <div className="TitleDiv">
            <label className="Title">Title</label>
            <button>Play</button>
            <button>Login</button>
        </div>
    )

}
function Box(props) {
    return (
        <div className="Box">
            <PlayForm/>
        </div>
    )
}
