import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Job_application from './Job_application';

export default class ActiveJob extends Component {
    
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            email:query.email,
            job:query.jobs,
            ara: []
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { query } = this.props.location;
        axios.post('http://localhost:4000/user/rec', query)
            .then(res => { 
                console.log(res.data);
                this.setState({ job : res.data.jobs });
            })
            .catch(err => console.log(err));
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            job: this.state.job
        }
        console.log(newUser);
        const { history } = this.props;
        const b = this.state.ara;
        axios.post('http://localhost:4000/user/edit_app_status',b)
        .then(res => {console.log(res.data);})
        .catch(err => {console.log(err)});

        axios.post('http://localhost:4000/user/edit_job', newUser)
            .then(res => { 
                alert("Successfully Edited");console.log(res.data);
                // history.push({
                //     "pathname" : '/recruiter' ,
                //     "info": res.data
                // })
            })
            .catch(err => {alert(err); console.log(err)});

        this.setState({
            email:newUser.email,
            job:newUser.job
        });
    }
    handleChange_pos(e,index) {
        this.state.job[index].max_pos = e.target.value;
        this.state.job[index].rem_pos = e.target.value;
        this.setState({job : this.state.job});
    } 
    handleChange_app(e,index) {
        this.state.job[index].max_app = e.target.value;
        this.setState({job : this.state.job});
    } 
    handleChange_dea(e,index) {
        this.state.job[index].deadline = e.target.value;
        this.setState({job : this.state.job});
    } 
    handleRemove(index) {
        const a = {
            job_id : this.state.job[index]._id,
            status : "Deleted"
        }
        var b =[];
        b = this.state.ara;
        b.push( {
            job_id : this.state.job[index]._id
        });
        this.setState({ara: b});
        this.state.job.splice(index,1);
        this.setState({job : this.state.job});
    }

    view_app (index) {
        const { query } = this.props.location;
        const { history } = this.props; 
        history.push({
            "pathname" : '/recruiter/job_application' ,
            "info": { 
                job_id : this.state.job[index]._id,
                email : query['email']
            }
        })
    }
    render() {
        return (
            <div>
                <Route path="/recruiter/job_application" exact component={Job_application}/>
                {this.state.job.map((jobs,index) => {
                    console.log(this.state.job[index].rem_pos);
                    if (this.state.job[index].rem_pos != 0) {
                        return (
                            <div>
                                <div key={1}>
                                    <label>Title: </label>
                                    <input  value={jobs.title}  readOnly = {true} />
                                </div>
                                <div key={2}>
                                    <label>Date of Posting:</label>
                                    <input value={this.state.job[index].date_pos}  readOnly = {true}/>
                                </div>
                                <div key={3}>
                                    <label>Remaining No. of Positions:</label>
                                    <input type="number" value={this.state.job[index].rem_pos} onChange={(e) => this.handleChange_pos(e,index)}/>
                                </div>
                                <div key={4}>
                                    <label>Maximum No. of Applicants:</label>
                                    <input type="number" value={this.state.job[index].max_app} onChange={(e) => this.handleChange_app(e,index)}/>
                                </div>
                                <div key={5}>
                                    <label>Deadline:</label>
                                    <input type="datetime-local" value={this.state.job[index].deadline} onChange={(e) => this.handleChange_dea(e,index)}/>
                                </div>
                                <div key={7}>
                                    <button onClick={() => this.view_app(index)}>Applications</button>
                                </div>
                                <div key={6}>
                                    <button onClick={()=> this.handleRemove(index)}>Delete</button> 
                                </div>
                                    <br></br>   
                                <br></br>
                            </div>
                        );
                    }
                })}
                <p>If you want to save the changes you made , Click save button</p>
                <button onClick={this.onSubmit}>Save</button>
           </div>
        )
    }
}