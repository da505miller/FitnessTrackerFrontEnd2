import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchPublicRoutines } from '../API';

const Routines = (props) => {

    const routines = props.routines;
    const setRoutines = props.setRoutines;
    const token = props.token;

    // As soon as page hits the screen useEffect will fetch all public routines from api and set them on state
    useEffect( async () => {

        const result = await fetchPublicRoutines();
        setRoutines(result);
        console.log(routines)

    }, []);

    

    return (<div id="post-box" className="form-group">
                <h1 className="post-title text-center">Public Routines</h1>
                <div id="post" className="container">
                    {routines.map((element, index) => {
            
                        return (
                            <div key={index} className="containter">
                                <h2 className="list-group-item-heading">
                                    { element.name }
                                </h2>
                                <div className="form-group list-group-item-info">
                                    Created by: { element.creatorName }
                                </div>
                                <div className="form-group list-group-item-info">
                                    Goal: { element.goal }
                                </div>
                                {/* <div className="form-group bg-success list-group-item-text">
                                    Activity: { element.activity }
                                </div> */}
                                {element.activities.map((activity, index) => {
                                    return (
                                        <div key={index} className="activity">
                                            <h4 className="form-group bg-success">Activities: {activity.name}</h4>
                                            <p>....Activity Description: {activity.description}</p>
                                            <p>....Duration: {activity.duration}</p>
                                            <p>....Count: {activity.count}</p>
                                        </div>
                                    );
                                })}
                            </div>)
                    })}
                </div>
            </div>)
}



export default Routines;