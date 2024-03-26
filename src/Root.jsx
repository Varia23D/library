import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import StudentHomePage from './Pages/StudentHomePage';

const Root = () => {
  
  const isAuthenticated = true; 

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <StudentHomePage /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
};

export default Root;