import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Applicant from './Applicant/Applicant';
import Recruiter from './Recruiter/Recruiter';

export default class Login extends Component {
	constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        const { history } = this.props;
        axios.post('http://localhost:4000/user/login', newUser)
            .then(res => {
                let a = res.data.toString();
                    if (a.localeCompare("1") == 0 ) {
                        alert("Credentials are wrong");
                    }
                    else {
                        alert(res.data.name);console.log(res.data);
                        if (res.data.type.localeCompare("Job Applicant") == 0) {
                            history.push({
                                "pathname" : '/applicant' ,
                                "info": res.data
                            })
                        }else {
                            history.push({
                                "pathname" : '/recruiter' ,
                                "info": res.data
                            })
                        };
                    }
                })
            .catch(err => {alert(err);console.log(err);});

        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <div>
                <Route path="/applicant" exact component={Applicant}/>
                <Route path="/recruiter" exact component={Recruiter}/>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}