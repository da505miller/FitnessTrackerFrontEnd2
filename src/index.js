import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Title, Home, Login, Logout, Register, Routines, MyRoutines, Newroutine, Activities, NewActivity, AddActivityToRoutine } from './Components';
import { fetchPublicRoutines } from './API';

const App = () => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [myRoutines, setMyRoutines] = useState([]);


    // As soon as page hits screen it will take the token from local storage (if there is one) and set it to storedToken.
    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        async function getActivities(){
          const res =  await fetch('https://fitnesstrac-kr.herokuapp.com/api/activities', {
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(response => response.json())
            .then(result => {
              return result;
            })
            .catch(console.error);
          console.log(res);
          setActivities(res);
      }
      getActivities();
      }, [])

      useEffect(async ()=> {                  
        const results = await fetchPublicRoutines();     
        setRoutines( results );
    }, []); 


    return( 
        <><Title />
            <h1>Welcome to the Fitness Tracker App</h1>
        <br></br>
        <Router>
            <div id="link-containter">
                <Link to="/home" className="link">HOME</Link>
                {!token ? <Link to="/login" className="link"> LOGIN </Link> : <Link to="/logout" className="link"> LOGOUT </Link>}
                {!token ? <Link to="/register" className="link"> REGISTER </Link> : null}
                <Link to="/routines" className="link"> ROUTINES </Link>
                {token ? <Link to="/myroutines" className="link"> MY ROUTINES </Link> : null}
                <Link to="/activities" className="link"> ACTIVITIES </Link>
            </div>

            <Route path="/home" render={(routeProps) => <Home />} />
            <Route path="/login" render={(routeProps) => <Login {...routeProps} setToken={setToken} />} />
            <Route path="/logout" render={(routeProps) => <Logout {...routeProps} token={token} setToken={setToken} />} />
            <Route path="/register" render={(routeProps) => <Register {...routeProps} setToken={setToken} />} />
            <Route path="/routines" render={(routeProps) => <Routines {...routeProps} 
                                                                token={token}
                                                                routines={routines}
                                                                setRoutines={setRoutines}
                                                                activities={activities}
                                                                setActivities={setActivities} />} />
            <Route path="/myroutines" render={(routeProps) => <MyRoutines {...routeProps}
                                                                 token={token}
                                                                 myRoutines={myRoutines}
                                                                 setMyRoutines={setMyRoutines}
                                                                 activities={activities}
                                                                 setActivities={setActivities}
                                                                 user={user}
                                                                 setUser={setUser} />} />
            <Route path="/newroutine" render={(routeProps) => <Newroutine {...routeProps} token={token}
                                                                routines={routines}
                                                                setRoutines={setRoutines} />} />
            <Route path="/activities" render={(routeProps) => <Activities {...routeProps}
                                                                token={token}
                                                                activities={activities}
                                                                setActivities={setActivities} />} />
            <Route path="/newactivity" render={(routeProps) => <NewActivity {...routeProps}
                                                                token={token}
                                                                activities={activities}
                                                                setActivities={setActivities} />} />
            <Route path="/addactivitytoroutine" render={(routeProps) => <AddActivityToRoutine {...routeProps}
                                                                token={token}
                                                                activities={activities}
                                                                setActivities={setActivities}
                                                                routines={routines}
                                                                user={user}
                                                                setUser={setUser} />} />
        </Router>

        {!token ? <h3>Please register or login to use the app unless you are just visiting.</h3> : null}
        </>)
    

}


ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );