import React, {useState} from 'react'
import './App.css';
import io from 'socket.io-client'
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
            <JoinRoomBox/>
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
    const [count, setCount] = useState(0)
    return (
        <div>
            <form className="CenterForm" method="get" action='/play/createGame'>
                <label>Creator Name</label>
                
                <input className="creatorName" type="text" required></input>
                <input className="Play" type="submit" value="Create Game"/>
            </form>
        </div>
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
function LoginBox(props) {
    return (
        <div className="LoginBox">
            <label class="switch">
                <input type="checkbox" class="checkbox" />
                <div class=""></div>
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
function toggleButton(props) {
    
}
function LoginForm(props) {
    return (
        <form className="LoginForm" method="get" action='/login'>
                <div>
                    <label>Username</label>
                    <input className="LoginInput" type="text" required></input>
                    <label>Password</label>
                    <input className="LoginInput" type="text" required></input>
                </div>
                <input className="Play" type="submit" value="Play"/>
        </form>
    )
}
function JoinRoomBox(props) {
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