import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAllActivities } from '../API';


const Activities = (props) => {

    const activities = props.activities;
    const setActivities = props. setActivities;
    const token = props.token;

    useEffect( async() => {

        const result = await fetchAllActivities();
        setActivities(result);
        console.log(activities);

    }, []);

    return (<div id="post-box" className="form-group">
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


export default Activities;