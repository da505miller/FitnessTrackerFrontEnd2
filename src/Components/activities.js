import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createActivity, fetchAllActivities } from '../API';


const Activities = (props) => {

    const activities = props.activities;
    const setActivities = props. setActivities;
    const token = props.token;

    useEffect( async() => {

        const result = await fetchAllActivities();
        setActivities(result);
        console.log(activities);

    }, []);


    return (
            <div id="post-box" className="form-group">
            <br></br>
            {token ? <Link to="/newactivity" className="link">Create A New Activity</Link> : null}
            <br></br>
            <br />
                <h1 className="post-title text-center">Activities</h1>
                <div id="post" className="container">
                    {activities.map((element, index) => {
            
                        return (
                            <div key={index} className="containter">
                                <div className="form-group list-group-item-info">
                                    ID: { element.id }
                                </div>
                                <div className="form-group bg-success">
                                    Name: {element.name }
                                </div>
                                <div className="form-group bg-success list-group-item-text">
                                    Description: { element.description }
                                </div>
                                <br></br>
                                {/* <br></br>
                                {token ? <Message token={token} _id={element._id}/>  : null}
                                <br></br>
                                <br></br> */}
                            </div>)
                    })}
                </div>
            </div>)




}

const NewActivity = ({setActivities, token, activities}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();

    return(
        <form onSubmit={async (event) => {
            event.preventDefault();
            try {
                const response = await createActivity(token, name, description);
                console.log("new activity is: ", response);
                if (response.error) {
                    alert('That activity already exists, try again!');
                    setName("");
                    setDescription("");
                }
                else {
                setActivities([...activities, response]);
                history.push("/activities")
                }
            }
            catch (error) {
                console.error(error)
            }
        }}>
                <h3>Make a new activity</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input onChange={(event) => setName(event.target.value)} type="text" className="form-control" placeholder="Name" required />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input onChange={(event) => setDescription(event.target.value)} type="text" className="form-control" placeholder="Description" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create New Activity</button>
                
            </form>
    )
}


export{ Activities,
    NewActivity };