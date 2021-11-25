import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Title } from './Components';

const App = () => {

    return( 
        <><Title />
        </>)
    

}


ReactDOM.render(
    <App />,
    document.getElementById('app'),
  );