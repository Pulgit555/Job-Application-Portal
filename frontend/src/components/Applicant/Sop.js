import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Dashboard';

export default class Sop extends Component {
	constructor(props) {
        super(props);
        const {info} =this.props.location;
        console.log(info);
        this.state = {
            sop: ''
        }

        this.onChangeSop = this.onChangeSop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeSop(event) {
        this.setState({ sop: event.target.value });
    }
    onChangeSop (event) {
        let text = event.target.value;
          let words = text.split(' ').filter(Boolean);
          if (words.length > 250) {
            this.setState({ sop: words.slice(0, 250).join(' ') });
          } 
          else {
            this.setState({ sop: event.target.value });
          }
    }

    onSubmit(e) {
        e.preventDefault();
        const {info} =this.props.location;
        const newUser = {
            r_email: info.r_email,
            a_email: info.a_email,
            job_id: info.job_id,
            sop : this.state.sop
        }
        const { history } = this.props;
        axios.post('http://localhost:4000/user/save_application', newUser)
             .then(res => {
                console.log(res.data);
                alert("Your application is Submitted");
                history.push ({"pathname" : '/applicant/dashboard' ,
                    "query": { 
                        email : res.data.a_mail
                    }});
                })
             .catch(res => {alert("Something went wrong");console.log(res.data);})
             ;

        this.setState({
            sop: ''
        });
    }

    render() {
        return (
            <div>
                <Route path="/applicant/dashboard" exact component={Dashboard}/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>SOP( not more than 250 words): </label>
                        <textarea rows="5" cols="50"  className="form-control" 
                                value={this.state.sop}
                                onChange={this.onChangeSop}> 
                                {/* {this.state.bio} */}
                            </textarea> 
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}