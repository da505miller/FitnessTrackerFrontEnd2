import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { userData, 
    publicRoutinesByActivity, 
    getUserRoutines, 
    createRoutine, 
    updateRoutine, 
    deleteRoutine, 
    attachActivityToRoutine, 
    updateOnRoutineActivity, 
    deleteActivityFromRoutine } from '../API';
import { Link } from 'react-router-dom';

const Myroutines = (props) => {
    const routines = props.routines;
    const setRoutines = props.setRoutines;
    const token = props.token;
    const history = props.history;

    const [userRoutines, setUserRoutines] = useState([]);
    const [user, setUser] = useState([]);

    const [displayRoutines, setDisplayRoutines] = useState([]);

    // useEffect(async () => {
        
    //     const result = await getUserRoutines(token);
    //     setUserRoutines(result);
    //     console.log(userRoutines);
    
    // }, []);

    // useEffect(async () => {
    //     if(token) {
    //     const getUser = await userData(token)
    //     console.log('getUser', getUser);
    //     const userRoutineData = await getUserRoutines(getUser, token)
    //     console.log(userRoutineData);
        

    //     }
 
    //  }, [])

    useEffect(() => {
        if(token) {
            userData(token, setUser);
        }
    }, [token]);

    useEffect(() => {
        if(user.username) {
            getUserRoutines(user, setUserRoutines, setDisplayRoutines);
            console.log("user routines: ", userRoutines)
        }
    }, [user]);

    console.log("user routines: ", userRoutines)

    return (<div id="post-box" className="form-group">
    <h1 className="post-title text-center">Current User Routines</h1>
    <div id="post" className="container">
        {displayRoutines.map((element, index) => {

            return (
                <div key={index} className="containter">
                    <h2 className="list-group-item-heading">
                        Routine Id: { element.id }
                    </h2>
                    <div className="form-group list-group-item-info">
                        Creator Name: { element.creatorName }
                    </div>
                    <div className="form-group list-group-item-info">
                        isPublic: {element.isPublic }
                    </div>
                    <div className="form-group list-group-item-info">
                        Name: { element.name}
                    </div>
                    <div className="form-group list-group-item-info">
                        Goal: {element.goal }
                    </div>
                    <div className="form-group">
                                    <button 
                                    onClick={async (event) => {
                                        
                                        try {
                                             // calls api function to delete routine and then fetches all the routines of user.
                                             // When delete button is pressed the post should delete from main routines page and push user to the routines page
                                            
                                            const response = await deleteRoutine(token, posts._id)
                                            console.log(response)
                                            getUserRoutines(userRoutines);
                                            
                                            history.push("/routines")
                                            
                                        }
                                        catch (err) {
                                            console.error("trouble deleting routine", err)
                                        }
                                    }} 
                                    
                                    type="submit" className="btn btn-primary">Delete Post</button>
                                </div>
                    <br></br>
                </div>)
        })}
    </div>
    <Link to="/newroutine" className="link">Create Routine</Link>
</div>)



}

// const Myroutines = (props) => {

//     const myRoutines = props.myRoutines;
//     const token = props.token;
//     const setMyRoutines = props.setMyRoutines;
//     let userObj = {};

//     async function getMe() {
//         const response = await userData(token);
//         userObj = response;
//     }
    
//     getMe();

//     async function getMyRoutines() {
//         const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${userObj.username}/routines`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//       })
//       const result = await response.json();
//       if (result.error) throw result.error;
//       console.log(result);
//       setMyRoutines(result);
//     }
    
    
//     useEffect(() => {
//         getMyRoutines();
//     },[]);

//     return (<div id="post-box" className="form-group">
//     <h1 className="post-title text-center">Current User Routines</h1>
//     <div id="post" className="container">
//         {myRoutines.map((element, index) => {

//             return (
//                 <div key={index} className="containter">
//                     <h2 className="list-group-item-heading">
//                         Routine Id: { element.id }
//                     </h2>
//                     <div className="form-group list-group-item-info">
//                         Creator Name: { element.creatorName }
//                     </div>
//                     <div className="form-group list-group-item-info">
//                         isPublic: {element.isPublic }
//                     </div>
//                     <div className="form-group list-group-item-info">
//                         Name: { element.name}
//                     </div>
//                     <div className="form-group list-group-item-info">
//                         Goal: {element.goal }
//                     </div>
//                     <br></br>
//                 </div>)
//         })}
//     </div>
//     <Link to="/newroutine" className="link">Create Routine</Link>
// </div>)
// }

    
    


const Newroutine = ({ token, routines, setRoutines }) => {

    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
    const [isPublic, setPublic] = useState(true);
    const history = useHistory();

    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await createRoutine(token, name, goal, isPublic);
                
                setRoutines([...routines, response]);
                history.push("/routines")
            }
            catch (error) {
                console.error(error)
            }
        }}>
                <h3>Make a new routine</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input onChange={(event) => setName(event.target.value)} type="text" className="form-control" placeholder="Title" required />
                </div>

                <div className="form-group">
                    <label>Goal</label>
                    <input onChange={(event) => setGoal(event.target.value)} type="text" className="form-control" placeholder="Description" required />
                </div>

                <div className="form-group">
                    <label>isPublic</label>
                    <input onChange={(event) => setPublic(event.target.value)} type="text" className="form-control" placeholder="Description" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Routine</button>
                
            </form>
    )
}


export { Myroutines, Newroutine };