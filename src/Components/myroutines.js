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


    



const MyRoutines = ({token, user, setUser }) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const history = useHistory();

    useEffect(async() => {
        if(token) {
            const user = await userData(token, setUser);
            const routines = await getUserRoutines(user.username, token)
            console.log('these are my routines', routines)
            setMyRoutines(routines);
            
        }
    }, [token]);
    
    return  (
            <div>
            <br></br>
            <br></br>
            <Link to="/newroutine" className="link">Create A New Routine</Link>

            <h1 className="post-title text-center"> CURRENT USER'S ROUTINES </h1>

            {myRoutines.map((routine, index) => {
                return (
                    <div key={index} id="post" className="container">
                        <h4>Name: {routine.name}</h4>
                        <ul>
                            <li>Activity Id: {routine.id}</li>
                            <li>Created By: {routine.creatorName}</li>
                            <li>Goal: {routine.goal}</li>
                            <li>isPublic: {routine.isPublic}</li>
                            <li>Activities: {routine.activities}</li>
                            <li>Activities: </li>
                                {myRoutines.activities ? (myRoutines.activities.map((activity, actindex) => (
                                    <ul key={actindex}>
                                        <li>Activity Name: {activity.name}</li>
                                        <ul>
                                            <li>Description: {activity.description}</li>
                                            <li>Count: {activity.count}</li>
                                            <li>Duration: {activity.duration}</li>
                                        </ul>
                                    </ul>
                                ))) : 
                                (<p>none</p>)}
                                
                                <ul>
                                        <button
                                            onClick={async () => {
                                            const routineId = routine.id
                                            const result = await deleteRoutine(token, routineId);
                                            const user = userData(token, setUser)
                                            console.log('deleted result is: ', result);
                                            getUserRoutines(user.username, token);
                                            alert('Routine deleted!');
                                            history.push('/myroutines');
                                            }}
                                            type="submit"
                                            className="btn btn-primary btn-block">
                                            Delete Routine
                                        </button>
                                        <Link to="/addactivitiestoroutine" className="link">Add an Activity</Link>
                                </ul>
                        </ul>
                    </div>
                )
            })}
            

            </div>
            )
        
}



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
                history.push("/myroutines")
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

const AddActivityToRoutine = ({token, id, activities}) => {
    const [activityId, setActivityId] = useState(null);
    const [updateCount, setUpdateCount] = useState("");
    const [updateDuration, setUpdateDuration] = useState("");

    return (
        <div>
                <form
                    
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await attachActivityToRoutine(token, id, activityId, updateCount, updateDuration)
                    }}
                >
                    <h1>Add activity</h1>
                    <label>Choose an activity: </label>
                    <select 
                        name="activities" 
                        id="activities" 
                        required 
                        onClick={(e) => {
                            e.preventDefault();
                            setActivityId(e.target.value)
                        }}>
                        {activities.map(activity => (
                            <option value={activity.id} key={activity.id}>
                                {activity.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type='number'
                        value={updateCount}
                        onChange={e => setUpdateCount(e.target.value)}
                        id="updateCount"
                        placeholder="Count"
                    />
                    <input
                        type='number'
                        value={updateDuration}
                        onChange={e => setUpdateDuration(e.target.value)}
                        id="updateDuration"
                        placeholder="Duration"
                    />
                    <button>
                        Add Activity To Routine
                    </button>
                </form>
        </div>
    )
}

export { MyRoutines, Newroutine, AddActivityToRoutine };