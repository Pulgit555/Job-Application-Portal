import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Fuse from 'fuse.js';

import Sop from './Sop';
export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            a_email : query['email'],
            st : '',
            job:[],
            sort_job: [],
            type_of_job : 'All',
            min_v: '',
            max_v: '',
            duration: '7',
            application : []
        }
        this.filter_job_type = this.filter_job_type.bind(this);
        this.filter_min_v = this.filter_min_v.bind(this);
        this.filter_max_v = this.filter_max_v.bind(this);
        this.filter_duration = this.filter_duration.bind(this);
        this.after_apply = this.after_apply.bind(this);
        this.search = this.search.bind(this);
        //this.createTable = this.createTable.bind(this);
    }

    componentDidMount() {
        const a={
            email : this.state.a_email
        };
        axios.post('http://localhost:4000/user/all_job', a)
        .then(res => { 
            this.setState({ job : res.data });
            this.setState({ sort_job : res.data });
        })
        .catch(err => {alert("No jobs available") ;console.log(err)});
        axios.post('http://localhost:4000/user/all_applications',a)
        .then(res => {
            // console.log(res.data);
            this.setState({ application : res.data});
        })
        .catch(err => {console.log(err)});
        
        axios.post('http://localhost:4000/user/app',a)
        .then(res => {
            this.setState({ st : res.data.stat});
        })
        .catch(err => {console.log(err)});
    }

    filter_job_type(event) {
        if(event.target.value) {
            var j_job_type = [];
            var x;
            var a;
            if(!this.state.duration)
            {
                a=7;
            }
            else{
                a=this.state.duration;
            }
            if(event.target.value.localeCompare("All") == 0) {
                for (x in this.state.job)
                {
                    if(this.state.job[x].duration < a) {
                        if (this.state.min_v ) {
                            if(  this.state.job[x].salary >= this.state.min_v) {
                                if(this.state.max_v) {
                                    if (this.state.job[x].salary <= this.state.max_v) {
                                        j_job_type.push(this.state.job[x]);
                                    }
                                }
                                else {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                        }
                        else {
                            if(this.state.max_v) {
                                if (this.state.job[x].salary <= this.state.max_v) {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                            else {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                    }
                }
            }
            else {
                for (x in this.state.job)
                {
                    if(this.state.job[x].type_job.localeCompare(event.target.value) == 0 && this.state.job[x].duration < a) {
                        if (this.state.min_v ) {
                            if(  this.state.job[x].salary >= this.state.min_v) {
                                if(this.state.max_v) {
                                    if (this.state.job[x].salary <= this.state.max_v) {
                                        j_job_type.push(this.state.job[x]);
                                    }
                                }
                                else {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                        }
                        else {
                            if(this.state.max_v) {
                                if (this.state.job[x].salary <= this.state.max_v) {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                            else {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                    }
                }
            } 
            this.setState({ sort_job : j_job_type });  
        }
        this.setState({type_of_job : event.target.value});
    }
    filter_min_v(event) {
        if(event.target.value) {
            var j_job_type = [];
            var x;
            var a;
            if(!this.state.duration)
            {
                a=7;
            }
            else{
                a=this.state.duration;
            }
            var b;
            if(this.state.type_of_job)
            {
                b=this.state.type_of_job;
            }
            else{
                b="All";
            }
            for (x in this.state.job) {
                if(b.localeCompare("All") == 0) {
                    if(event.target.value && this.state.job[x].salary >= event.target.value && this.state.job[x].duration < a) {
                        if(this.state.max_v) {
                            if (this.state.job[x].salary <= this.state.max_v) {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                        else {
                            j_job_type.push(this.state.job[x]);
                        }
                    }
                }
                else{
                    if(this.state.job[x].type_job.localeCompare(b) == 0 && event.target.value && this.state.job[x].salary >= event.target.value && this.state.job[x].duration < a) {
                        if(this.state.max_v) {
                            if (this.state.job[x].salary <= this.state.max_v) {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                        else {
                            j_job_type.push(this.state.job[x]);
                        }
                    }
                }
            } 
            this.setState({ sort_job : j_job_type });    
        }
        this.setState({min_v : event.target.value});
    }
    filter_max_v(event) {
        if(event.target.value) {
            var j_job_type = [];
            var x;
            var a;
            if(!this.state.duration)
            {
                a=7;
            }
            else{
                a=this.state.duration;
            }
            var b;
            if(this.state.type_of_job)
            {
                b=this.state.type_of_job;
            }
            else{
                b="All";
            }
            for (x in this.state.job) {
                if(b.localeCompare("All") == 0) {
                    if(event.target.value && this.state.job[x].salary <= event.target.value && this.state.job[x].duration < a) {
                        if(this.state.min_v) {
                            if (this.state.job[x].salary >= this.state.min_v) {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                        else {
                            j_job_type.push(this.state.job[x]);
                        }
                    }
                }
                else{
                    if(this.state.job[x].type_job.localeCompare(b) == 0 && event.target.value && this.state.job[x].salary <= event.target.value && this.state.job[x].duration < a) {
                        if(this.state.max_v) {
                            if (this.state.job[x].salary >= this.state.min_v) {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                        else {
                            j_job_type.push(this.state.job[x]);
                        }
                    }
                }
            } 
            this.setState({ sort_job : j_job_type });
        }
        this.setState({max_v : event.target.value});
    }
    filter_duration(event) {
        if(event.target.value) {
            var j_job_type = [];
            var x;
            var b;
            if(this.state.type_of_job)
            {
                b=this.state.type_of_job;
            }
            else{
                b="All";
            }
            for (x in this.state.job)
            {
                if (this.state.job[x].duration < event.target.value) {
                    if(b.localeCompare("All") == 0) {
                        if (this.state.min_v ) {
                            if(  this.state.job[x].salary >= this.state.min_v) {
                                if(this.state.max_v) {
                                    if (this.state.job[x].salary <= this.state.max_v) {
                                        j_job_type.push(this.state.job[x]);
                                    }
                                }
                                else {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                        }
                        else {
                            if(this.state.max_v) {
                                if (this.state.job[x].salary <= this.state.max_v) {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                            else {
                                j_job_type.push(this.state.job[x]);
                            }
                        }
                    }
                    else {
                        if (this.state.job[x].type_job.localeCompare(b) == 0) {
                            if (this.state.min_v ) {
                                if(  this.state.job[x].salary >= this.state.min_v) {
                                    if(this.state.max_v) {
                                        if (this.state.job[x].salary <= this.state.max_v) {
                                            j_job_type.push(this.state.job[x]);
                                        }
                                    }
                                    else {
                                        j_job_type.push(this.state.job[x]);
                                    }
                                }
                            }
                            else {
                                if(this.state.max_v) {
                                    if (this.state.job[x].salary <= this.state.max_v) {
                                        j_job_type.push(this.state.job[x]);
                                    }
                                }
                                else {
                                    j_job_type.push(this.state.job[x]);
                                }
                            }
                        }
                    }
                }
            }
            this.setState({ sort_job : j_job_type });
        }
        this.setState({duration : event.target.value});
    }
    sort_sal_inc (e) {
        var job_arr = this.state.sort_job;
        job_arr.sort((a, b) => a.salary > b.salary ? 1 : -1);
        this.setState({sort_job:job_arr});
    }
    sort_sal_dec (e) {
        var job_arr = this.state.sort_job;
        job_arr.sort((a, b) => a.salary > b.salary ? -1 : 1);
        this.setState({sort_job:job_arr});
    }
    sort_dur_inc (e) {
        var job_arr = this.state.sort_job;
        job_arr.sort((a, b) => a.duration > b.duration ? 1 : -1);
        this.setState({sort_job:job_arr});
    }
    sort_dur_dec (e) {
        var job_arr = this.state.sort_job;
        job_arr.sort((a, b) => a.duration > b.duration ? -1 : 1);
        this.setState({sort_job:job_arr});
    }
    sort_rat_inc (e) {
        var job_arr = this.state.sort_job;
        job_arr.sort((a, b) => a.rates.rate_value > b.rates.rate_value ? 1 : -1);
        this.setState({sort_job:job_arr});
    }
    sort_rat_dec (e) {
        var job_arr = this.state.sort_job;
        job_arr.sort((a, b) => a.rates.rate_value > b.rates.rate_value ? -1 : 1);
        this.setState({sort_job:job_arr});
    }
    search (event) {
        if(!event.target.value)
        {
            this.setState({sort_job:this.state.job});
        }
        else {
            const option ={
                keys: ["title"],
                findAllMatches: true
            }
            const a = this.state.job;
            const fuse = new Fuse(a, option);
            let result = fuse.search(event.target.value);
            var c =[];
            for(var x in result) {
                c.push(result[x].item);
            }
            this.setState({sort_job:c});
        }
    }

    after_apply (a) {
        const { history } = this.props;
        if (a[0] >= 10 || this.state.st.localeCompare("W") != 0)
        {
            alert("You cant apply any more");
        }
        else
        {
            history.push({
                "pathname" : '/applicant/sop' ,
                "info": { 
                    a_email : this.state.a_email,
                    r_email: a[1],
                    job_id : a[2]
                }
            })
        }
    }
    createTable = () => {
        let table = [];
        let child = [] ;
        child.push(<th>Title</th>);
        child.push(<th>Recruiter Name</th>);
        child.push(<th>Salary</th>);
        child.push(<th>Duration</th>);
        child.push(<th>Deadline</th>);
        child.push(<th>Job Type</th>);
        child.push(<th>Rating</th>);
        child.push(<th></th>);
        table.push(<tr>{child}</tr>);
        for (var x in this.state.sort_job) {
            console.log(new Date(this.state.sort_job[x].deadline) > new Date() );
            if (this.state.sort_job[x].rem_pos != 0 && new Date(this.state.sort_job[x].deadline) > new Date()) {
                let children = []
                children.push(<td>{this.state.sort_job[x].title}</td>);
                children.push(<td>{this.state.sort_job[x].name}</td>);
                children.push(<td>{this.state.sort_job[x].salary}</td>);
                children.push(<td>{this.state.sort_job[x].duration}</td>);
                children.push(<td>{this.state.sort_job[x].deadline}</td>);
                children.push(<td>{this.state.sort_job[x].type_job}</td>);
                if (this.state.sort_job[x].rates) {
                    children.push(<td>{this.state.sort_job[x].rates.rate_value}</td>);
                }
                else {
                    children.push(<td>"0"</td>);
                }
                if (this.state.st.localeCompare("A") == 0) {
                    children.push(<td><button style={{ backgroundColor :'brown'}}>Not Applicable</button></td>);
                }
                else {
                    var y;
                    var z=0;
                    var k=0;
                    var r=0;
                    for (y in this.state.application) {
                        if(this.state.application[y].job_id)  {
                            if (this.state.application[y].job_id.localeCompare(this.state.sort_job[x].job_id) == 0)
                            {
                                k=k+1;
                                if (this.state.application[y].a_mail.localeCompare(this.state.a_email) == 0) {
                                    z=1;
                                }
                            }
                            if (this.state.application[y].a_mail.localeCompare(this.state.a_email) == 0 && (this.state.application[y].status.localeCompare("Applied") == 0 || this.state.application[y].status.localeCompare("Shortlisted") == 0)) {
                                r=r+1;
                            }
                        }
                    }
                    if (z == 1) {
                        children.push(<td><button style={{ backgroundColor :'blue'}}>Applied</button></td>);
                    }
                    else {
                        if (k >= this.state.sort_job[x].max_app) {
                            children.push(<td><button style={{ backgroundColor :'red'}}>Full</button></td>);
                        }
                        else {
                            var kk=this.state.sort_job[x].email;
                            var rr=this.state.sort_job[x].job_id;
                            var a = [r,kk,rr];
                            console.log(rr);
                            children.push(<td><button onClick={() => this.after_apply(a)} style={{ backgroundColor :'green'}}>Apply</button></td>);
                        }
                    }
                }
                table.push(<tr>{children}</tr>)
            }
        }
        return table
      }
    render() {
        return (
            <Router>
                <Route path="/applicant/sop" exact component={Sop}/>
            <div>
                <div>
                    <h3>Filter</h3>
                    <div className="form-group">
                        <label>Type of Job: </label>
                        <select value= {this.state.type_of_job} onChange={this.filter_job_type}
                            className="form-control" >
                            {/* <option  value="Select Type of job">Select the Type of Job</option> */}
                            <option  value="All">All</option>
                            <option  value="Full-time">Full-time</option>
                            <option  value="Part-time">Part-time</option>
                            <option  value="Work from Home">Work from Home</option>
                        </select> 
                        <label>Salary: </label>
                        <input placeholder="minimum salary" type="number" min="0" value={this.state.min_v} className="form-control" onChange={this.filter_min_v}/>
                        <input placeholder="maximum salary" type="number" min="0" value={this.state.max_v} className="form-control" onChange={this.filter_max_v}/> 
                        <label>Duration: </label>
                        <select value= {this.state.duration} onChange={this.filter_duration}
                            className="form-control" >
                            <option  value="7">7</option>
                            <option  value="6">6</option>
                            <option  value="5">5</option>
                            <option  value="4">4</option>
                            <option  value="3">3</option>
                            <option  value="2">2</option>
                            <option  value="1">1</option> 
                        </select>
                    </div>
                    <h3>Sort</h3>
                    <div>
                        <label>Salary</label>
                        <button onClick={(e) => this.sort_sal_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_sal_dec(e)}>&#8659;</button>
                        <label>Duration</label>
                        <button onClick={(e) => this.sort_dur_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_dur_dec(e)}>&#8659;</button>
                        <label>Rating</label>
                        <button onClick={(e) => this.sort_rat_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_rat_dec(e)}>&#8659;</button>
                    </div>
                    <h3>Search</h3> 
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={this.search}></input>
                    </div>
                </div>
                <table>
                    {this.createTable()}
                </table>
           </div>
           </Router>
        )
    }
}