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

// this will fetch all the activities
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

//this call will create a new activity with a valid token
export const createActivity = async (token, name, description) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/activities', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: name,
                description: description
            }),
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('Trouble creating activity!!!!'))
        throw error;
    }
}

//this will update an activity with a token, activityId, name, and description
export const updateActivity = async (token, id, name, description) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: name,
                description: description
            }),
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('Trouble updating activity!!!'));
        throw error;
    }
}

//this will return a list of public routines which feature that activity
export const publicRoutinesByActivity = async (id) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${id}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('Error getting public routines that feature that activity!!!'));
        throw error;
    }
}


//this will fetch all the current user's routines by their username and token
export const getUserRoutines = async (username, token) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const result = response.json();

        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('Trouble getting user routines!!!'));
        throw error;
    }
}

//this will attempt to create a new routine
export const createRoutine = async (token, name, goal, isPublic) => {
    try {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic
            }),
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('ERROR creating new routine!!!'));
        throw error;
    }
}

//this will update a routine, notably change public/private, name, or goal
export const updateRoutine = async (token, id, name, goal, isPublic) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: isPublic
            }),
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('ERROR updating routine!!!'));
        throw error;
    }
}

//this will hard delete a routine. make sure to delete all the routineActivities whose routine is the one being deleted
//will hard delete a routine whose id is equal to routineId
export const deleteRoutine = async (token, id) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('ERROR deleting routine!!!'));
        throw error;
    }
}

//this attaches a single activity to a routine. prevents duplication on (routineId, activityId) pair
export const attachActivityToRoutine = async (token, id, actId, count, duration) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}/activities`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                activityId: actId,
                count: count,
                duration: duration
            }),
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('ERROR attaching activity to routine!!!'));
        throw error;
    }
}

//this updates the count or duration on routine activity
export const updateOnRoutineActivity = async (token, id, count, duration) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                'Authorizaion': 'Bearer ' + token
            },
            body: JSON.stringify({
                count: count,
                duration: duration
            }),
        })
        const result = await response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('ERROR updating count or duration on routine activity!!!'));
        throw error;
    }
}

//this will remove an activity from a routine(hard deleting routine_activity)
//dissociating an activity from a routine
export const deleteActivityFromRoutine = async (token, id) => {
    try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const result = response.json();
        if (result.error) throw result.error;
        console.log(result);
        return result;
    } 
    
    catch (error) {
        console.error(chalk.red('ERROR deleting activity from routine!!!'));
        throw error;
    }
}