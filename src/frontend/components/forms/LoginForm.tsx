import React from "react";

export function LoginForm(props: any) {
    return (
        <form className="LoginForm" method="post" action='/login'>
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