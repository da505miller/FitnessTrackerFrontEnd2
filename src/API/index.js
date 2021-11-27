// These are all the fetch calls to the API

const chalk = require('chalk');

// This function is used to register new user
export const registerNewUser = async (setToken, username, password, verifyPassword) => {
    
    try {
        if (password !== verifyPassword) {
            alert("PASSWORDS DON'T MATCH!");
            return;
        }

        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
                    username: username,
                    password: password
                
            })
        })
        const result = await response.json();
        const user = result.user;
        const token = result.token
        console.log(chalk.cyan("New registered user: "), user)
        setToken(token);
        localStorage.setItem("token", token);
        if (result.error) throw result.error;
        console.log(result)
    }
    catch (err) {
        console.error(chalk.red("Trouble registering"), err);
    }
   }

// This function will login an existing user
export const loginUser = async (username, password, setToken) => {
    try {const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
     method: "POST",
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       
         username: username,
         password: password
       
     })
   })
         const result = await response.json();
         console.log(result.token);
         const token = result.token;
         setToken(token);
         localStorage.setItem("token", token);
         localStorage.getItem("token");
         if (result.error) throw result.error;
         console.log(result);
 
 }
     catch (err) {
         console.error(chalk.red("Trouble logging in"), err)
     }
}

 // test call to grab users info (token and to see if logged in)
 export const userData = async (token) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const result = await response.json();
        console.log(chalk.cyan("Logged in user data: "), result);
        return result;
       
    }
    catch (err) {
        console.error(chalk.red("Trouble fetching user data!!!"), err);
    }
} 

// This function fetches all current public routines from the API
export const fetchPublicRoutines = async () => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        )
        const result = await response.json();
        
        
        if (result.error) throw result.error;
        console.log(result)
        return result;
    }
    catch (err) {
        console.error (chalk.red("Trouble fetching public routines"), err)
    }
}

export const fetchAllActivities = async () => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )
        const result = await response.json();

        if (result.error) throw result.error;
        console.log(result)
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('Trouble fetching all activities!!!'), error)
    }
}
