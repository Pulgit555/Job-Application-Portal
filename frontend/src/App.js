import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./App.css"

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Applicant from './components/Applicant/Applicant';
import Recruiter from './components/Recruiter/Recruiter';
import Dashboard from './components/Applicant/Dashboard';

export default class App extends Component  {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Home</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>                           
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/applicant" exact component={Applicant}/>
          <Route path="/recruiter" exact component={Recruiter}/>   
          <Route path="/applicant/dashboard" exact component={Dashboard}/>      
        </div>
      </Router>
    );
  }
}
