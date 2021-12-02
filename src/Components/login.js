import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registerNewUser, loginUser } from '../API';
const chalk = require('chalk');


const Login = ({ setToken, match, history }) => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    return(
        <form
            onSubmit={(event) => {
                event.preventDefault();
                
                if (match.url === "/register") {
                    registerNewUser(setToken, userName, password, confirmedPassword)};
                    history.push("/login")
                if (match.url === "/login") {
                    console.log(userName, password, confirmedPassword);
                    loginUser(userName, password, setToken)};
                    history.push("/home")
                    
            } 
                }>
            <div className="form-group">
                    <label>Username</label>
                    <input 
                        onChange={({target: {value}}) => setUserName(value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="Username" 
                        required 
                    />
            </div>

            <div className="form-group">
                    <label>Password</label>
                    <input 
                        onChange={({target: {value}}) => setPassword(value)} 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        required 
                    />
            </div>
            {
                match.url === "/register" ?
            
                (<div className="form-group">
                    <label>Verify Password</label>
                    <input 
                        onChange={({target: {value}}) => setConfirmedPassword(value)} 
                        type="password"
                        value={confirmedPassword} 
                        className="form-control" 
                        placeholder="Verify password" 
                        required 
                    />
                </div>) : null}

                <button 
                    type="submit" 
                    className="btn btn-primary btn-dark btn-lg btn-block">Login
                </button>
            {
                match.url === "/register" ?
                (<Link to="login"> Already have an account?</Link>) : 
                 <Link to="register"> Don't have an account?</Link>
            }
        </form>
    )


}


const Logout = ({ token, setToken, history }) => {

    return (
        <button
            onClick={(event) => {
                const storageToken = token;
                console.log(chalk.cyan("storage token is:"), storageToken)
                
                if (storageToken) {
                    localStorage.removeItem("token");
                    setToken(null);
                    alert('Have a nice life. Goodbye');
                    history.push("/login");
                    }
            }} 
            type="submit"
            className="btn btn-primary btn-dark btn-lg btn-block">Logout
        </button>
    )


}


export { Login, Logout };