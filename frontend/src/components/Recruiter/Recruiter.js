import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Profile from './Profile';
import Createjob from './CreateJob';
import Activejob from './ActiveJob';
import SelectedEmployees from './SelectedEmployees';
import Job_application from './Job_application';

export default class Recruiter extends Component {
	constructor(props) {
        super(props);
    }
    render() {
        const { info } = this.props.location;
        return (
            <Router>
                <div className="container">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                          <Link to={{pathname: "/recruiter/profile",query : info}} className="nav-link">Profile</Link>
                        </li>
                        <li className="navbar-item">
                          <Link to={{pathname: "/recruiter/createjob",query : info}} className="nav-link">CreateJob</Link>
                        </li>
                        <li className="navbar-item">
                          <Link to={{pathname: "/recruiter/activejob", query : info}} className="nav-link">ActiveJobs</Link>
                        </li> 
                        <li className="navbar-item">
                          <Link to={{pathname: "/recruiter/selectedemployees", query : info}} className="nav-link">SelectedEmployees</Link>
                        </li>                            
                      </ul>
                    </div>
                  </nav>
                  <br/>
                  <Route path="/recruiter/profile" exact component={Profile}/>
                  <Route path="/recruiter/createjob" exact component={Createjob}/>
                  <Route path="/recruiter/activejob" exact component={Activejob}/>
                  <Route path="/recruiter/selectedemployees" exact component={SelectedEmployees}/>
                  <Route path="/recruiter/job_application" exact component={Job_application}/>
                </div>
            </Router>
        )
    }
}