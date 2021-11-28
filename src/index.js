import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Title, Home, Login, Logout, Register, Routines, Myroutines, Newroutine, Activities } from './Components';

const App = () => {

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);


    // As soon as page hits screen it will take the token from local storage (if there is one) and set it to storedToken.
    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
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
            <Route path="/myroutines" render={(routeProps) => <Myroutines {...routeProps}
                                                                 token={token}
                                                                 routines={routines}
                                                                 setRoutines={setRoutines}
                                                                 activities={activities}
                                                                 setActivities={setActivities} />} />
            <Route path="/newroutine" render={(routeProps) => <Newroutine {...routeProps} token={token}
                                                                routines={routines}
                                                                setRoutines={setRoutines} />} />
            <Route path="/activities" render={(routeProps) => <Activities {...routeProps}
                                                                token={token}
                                                                activities={activities}
                                                                setActivities={setActivities} />} />
        </Router>

        {!token ? <h3>Please register or login to use the app unless you are just visiting.</h3> : null}
        </>)
    

}


ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );