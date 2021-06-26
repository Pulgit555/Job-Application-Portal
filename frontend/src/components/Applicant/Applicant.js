import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Profile from './Profile';
import Dashboard from './Dashboard';
import Application from './Applications';
import Sop from './Sop';

export default class Applicant extends Component {
	constructor(props) {
        super(props);
    }
    render() {
        const { info } = this.props.location;
        var x ;
        for (x in info) {
          console.log(info[x]);
        }
        return (
            <Router>
                <div className="container">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                      <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                          <Link to={{pathname: "/applicant/profile", query : info}} className="nav-link">Profile</Link>
                        </li>
                        <li className="navbar-item">
                          <Link to={{pathname: "/applicant/dashboard", query : info}} className="nav-link">Dashboard</Link>
                        </li>
                        <li className="navbar-item">
                          <Link to={{pathname: "/applicant/application", query : info}} className="nav-link">My Applications</Link>
                        </li>                            
                      </ul>
                    </div>
                  </nav>
                  <br/>
                  <Route path="/applicant/profile" exact component={Profile}/>
                  <Route path="/applicant/dashboard" exact component={Dashboard}/>
                  <Route path="/applicant/application" exact component={Application}/>
                  <Route path="/applicant/sop" exact component={Sop}/>
                </div>
            </Router>
        )
    }
}