import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Applicant from './Applicant/Applicant';
import Recruiter from './Recruiter/Recruiter';

export default class Register extends Component {
	constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            type: 'type'
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password : this.state.password,
            type : this.state.type
        }
        const { history } = this.props;
        axios.post('http://localhost:4000/user/register', newUser)
            .then(res => { 
                    let a = res.data.toString();
                    if (a.localeCompare("1") == 0 ) {
                        alert("Email already existed");
                    }
                    else {
                         alert("Created\t" + res.data.name);console.log(res.data);
                        if (res.data.type.localeCompare("Job Applicant") == 0) {
                            history.push({
                                "pathname" : '/applicant' ,
                                "info": res.data
                            })
                        }
                        else {
                            history.push({
                                "pathname" : '/recruiter' ,
                                "info": res.data
                            })
                        };
                    }
                }
            )
            .catch(err => {alert(err); console.log(err)});

        this.setState({
            name: '',
            email: '',
            password: '',
            type: ''
        });
    }

    render() {
        return (
            <div>
                <Route path="/applicant" exact component={Applicant}/>
                <Route path="/recruiter" exact component={Recruiter}/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                            className="form-control" 
                            value={this.state.name}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                            className="form-control" 
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                            className="form-control" 
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <select value= {this.state.type} onChange={this.onChangeType}
                            className="form-control" >
                            <option  value="Select Job Type">Select Job Type</option>
                            <option  value="Job Recruiter">Job Recruiter</option>
                            <option  value="Job Applicant">Job Applicant</option>
                        </select>  
                    </div>
                    <a href="/google/oauth2?signup=1" className="pm-btn pm-btn-info google-sign-up">
                        <div className="google-logo">
                            <img src="https://assets.getpostman.com/common-share/google-logo-icon-sign-in.svg" width="18px" height="18px"/>
                        </div>
                        <div className="google-text">
                            <div>Sign up with Google</div>
                        </div>
                    </a>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}