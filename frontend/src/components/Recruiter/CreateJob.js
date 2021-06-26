import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button} from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

import Recruiter from './Recruiter';

export default class CreateJob extends Component {
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            title: '',
            name: query["name"],
            email: query["email"],
            max_no_app: '',
            max_no_pos: '',
            // date_of_posting: new Date(date,month,year),
            deadline: '',
            req_skills: [],
            type_of_job: '',
            duration: '',
            salary: '',
            rating: query["rating"]
        };
        // console.log(new Date(date,month,year));
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangemax_no_app = this.onChangemax_no_app.bind(this);
        this.onChangemax_no_pos = this.onChangemax_no_pos.bind(this);
        // this.onChangedate_of_posting = this.onChangedate_of_posting.bind(this);
        this.onChangedeadline = this.onChangedeadline.bind(this);
        this.onChangetype_of_job = this.onChangetype_of_job.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangesalary = this.onChangesalary.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }
    onChangemax_no_app(event) {
        this.setState({ max_no_app: event.target.value });
    }
    onChangemax_no_pos(event) {
        this.setState({ max_no_pos: event.target.value });
    }
    // onChangedate_of_posting(event) {
    //     this.setState({ date_of_posting: event.target.value });
    // }
    onChangedeadline(event) {
        this.setState({ deadline: event.target.value });
    }
    onChangetype_of_job(event) {
        this.setState({ type_of_job: event.target.value });
    }
    onChangeduration(event) {
        this.setState({ duration: event.target.value });
    }
    onChangesalary(event) {
        this.setState({ salary: event.target.value });
    }
    addreq_skills() {
        this.setState({req_skills: [...this.state.req_skills, ""]});
    }
    handleChange(e,index) {
        this.state.req_skills[index] = e.target.value;
        this.setState({req_skills: this.state.req_skills});
    } 
    handleRemove(index) {
        this.state.req_skills.splice(index,1);
        this.setState({req_skills : this.state.req_skills});
    }
    onSubmit(e) {
        e.preventDefault();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd+ '/' + mm + '/' + yyyy;
        // document.write(today);
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            title : this.state.title,
            max_no_pos : this.state.max_no_pos,
            max_no_app : this.state.max_no_app,
            date_of_posting : today,
            deadline : this.state.deadline,
            req_skills : this.state.req_skills,
            type_of_job : this.state.type_of_job,
            duration : this.state.duration,
            salary : this.state.salary
        }
        console.log(newUser);
        const { history } = this.props;
        axios.post('http://localhost:4000/user/add_job', newUser)
            .then(res => { 
                alert("Created New Job");console.log(res.data);
                // history.push({
                //     "pathname" : '/recruiter' ,
                //     "info": res.data
                // })
            })
            .catch(err => {alert(err); console.log(err)});

        const { query } = this.props.location;
        this.setState({
            title: '',
            name: query["name"],
            email: query["email"],
            max_no_app: '',
            max_no_pos: '',
            // date_of_posting: new Date(),
            deadline: '',
            req_skills: [],
            type_of_job: '',
            duration: '',
            salary: '',
            rating: query["rating"]
        });
    }

    render() {
        return (
            <div>
                <Route path="/recruiter" exact component={Recruiter}/>
                <form >
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" 
                            className="form-control" 
                            value={this.state.name}
                            readOnly = {true}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" 
                            className="form-control" 
                            value={this.state.email}
                            readOnly = {true}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" 
                            className="form-control" 
                            value={this.state.title}
                            onChange={this.onChangetitle}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Max No. of Applications: </label>
                        <input type="number" 
                            className="form-control" 
                            value={this.state.max_no_app}
                            onChange={this.onChangemax_no_app}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Max No. of Positions: </label>
                        <input type="number" 
                            className="form-control" 
                            value={this.state.max_no_pos}
                            onChange={this.onChangemax_no_pos}
                        />  
                    </div>
                    {/* <div className="form-group">
                        <label>Date of Posting: </label>
                        <input type="date" 
                            className="form-control" 
                            value={this.state.date_of_posting}
                            readOnly = {true}
                            // onChange={this.onChangedate_of_posting}
                        />  
                    </div> */}
                    <div className="form-group">
                        <label>Deadline: </label>
                        <input type="datetime-local" 
                            className="form-control" 
                            value={this.state.deadline}
                            onChange={this.onChangedeadline}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Type of Job: </label>
                        <select value= {this.state.type_of_job} onChange={this.onChangetype_of_job}
                            className="form-control" >
                            <option  value="Select Type of job">Select the Type of Job</option>
                            <option  value="Full-time">Full-time</option>
                            <option  value="Part-time">Part-time</option>
                            <option  value="Work from Home">Work from Home</option>
                        </select>  
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input type="number" min="0" max="6" 
                            className="form-control" 
                            value={this.state.duration}
                            onChange={this.onChangeduration}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Salary: </label>
                        <input type="number" min="1"
                            className="form-control" 
                            value={this.state.salary}
                            onChange={this.onChangesalary}
                        />  
                    </div>
                    <div className="form-group">
                        <label>Rating: </label>
                        <input type="text" 
                            className="form-control" 
                            value={this.state.rating}
                            readOnly = {true}
                        />
                    </div>
                </form>
                <div>
                    <label>Required Skills</label>
                       {this.state.req_skills.map((req_skills,index) => {
                           console.log(req_skills);
                             return (
                                <div key={index}>
                                <input  value={req_skills} onChange={(e) => this.handleChange(e,index)}/>
                                <button onClick={()=> this.handleRemove(index)}> Remove</button>
                            </div>
                            );
                        })}
                    <hr/>
                    <button onClick={(e) => this.addreq_skills(e)}>Add Required Skills</button>
                </div>
                <br></br>
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}