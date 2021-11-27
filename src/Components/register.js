import React from 'react';
const chalk = require('chalk');
import { useState } from 'react';
import { registerNewUser } from '../API';

// The register component is a form where a new user can enter a username, password, and they must verify their password. 
// All fields are required.
// Once the fill out form and hit register button, their info will now be authorized and it will push them to the login page where they must login to the site.


const Register = (props) => {
    const setToken = props.setToken;
    const history = props.history;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await registerNewUser(setToken, username, password, verifyPassword);
                history.push("/login")
            }
            catch (error) {
                console.error(chalk.red('error registering user onSubmit'), error);

            }
            
            
        }}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" placeholder="Username" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} type="password" className="form-control" placeholder="Enter password" required />
                </div>

                <div className="form-group">
                    <label>Verify Password</label>
                    <input onChange={(event) => setVerifyPassword(event.target.value)} type="password" className="form-control" placeholder="Verify password" required />
                </div>

                <button type="submit" className="btn btn-primary btn-dark btn-lg btn-block">Register</button>
                
            </form>
    )
}





export default Register;