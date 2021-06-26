import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Recruiter from './Recruiter';

export default class Form_r extends Component {
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
            //date: Date.now()
        }
        const { history } = this.props;
        axios.post('http://localhost:4000/user/login', newUser)
             .then(res => {alert(res.data.name);console.log(res.data);})
             .catch(res => {alert("Credentials are wrong");console.log(res.data);history.push('/applicant');})
             ;

        this.setState({
            email: '',
            password: ''
            //date:null
        });
    }

    render() {
        return (
            <div>
                <Route path="/applicant" exact component={Recruiter}/>
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