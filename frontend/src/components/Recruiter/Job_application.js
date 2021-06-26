import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import ActiveJob from './ActiveJob';

export default class Job_application extends Component {
    
    constructor(props) {
        super(props);
        const { info } = this.props.location;
        this.state = {
            r_email : info['email'],
            app:[],
            sort_app: [],
            c : ''
        }
        // this.after_apply = this.after_apply.bind(this);
        //this.createTable = this.createTable.bind(this);
    }

    componentDidMount() {
        const { info } = this.props.location;
        axios.post('http://localhost:4000/user/job_applications', info)
        .then(res => { 
            console.log(res.data);
            this.setState({ app : res.data });
            this.setState({ sort_app : res.data }); 
        })
        .catch(err => {alert("No Applications available") ;console.log(err);});
    }
    sort_name_inc (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.name > b.name ? 1 : -1);
        this.setState({sort_app:app_arr});
    }
    sort_name_dec (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.name > b.name ? -1 : 1);
        this.setState({sort_app:app_arr});
    }
    sort_doa_inc (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.date_app > b.date_app ? 1 : -1);
        this.setState({sort_app:app_arr});
    }
    sort_doa_dec (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.date_app > b.date_app ? -1 : 1);
        this.setState({sort_app:app_arr});
    }
    sort_rat_inc (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.rate_value > b.rate_value ? 1 : -1);
        this.setState({sort_app:app_arr});
    }
    sort_rat_dec (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.rate_value > b.rate_value ? -1 : 1);
        this.setState({sort_app:app_arr});
    }

    short_list (z) {
        const newUser = {
            app_id : this.state.sort_app[z].app_id,
            status : "Shortlisted"
        }
        axios.post('http://localhost:4000/user/up_application', newUser)
        .then(res => {alert("Application is updated"); console.log("Application is updated");})
        .catch(res => {alert("Status is not changed");console.log(res.data);})
        this.setState({c : "1"});
    }
    accept (z) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd+ '/' + mm + '/' + yyyy;
        const newUser = {
            app_id : this.state.sort_app[z].app_id,
            status : "Accepted",
            date_join : today
        }
        axios.post('http://localhost:4000/user/up_application', newUser)
        .then(res => { alert("Application is updated"); console.log("Application is updated");})
        .catch(res => {alert("Status is not changed");console.log(res.data);})
        
        const nu = {
            job_id : this.state.sort_app[z].job_id,
            r_mail : this.state.r_email
        }
        axios.post('http://localhost:4000/user/up_job_pos', nu)
        .then(res => {console.log("Application is updated");})
        .catch(err => {console.log(err.data);} )

        const u = {
            a_mail : this.state.sort_app[z].email
        }
        axios.post('http://localhost:4000/user/up_stat_applicant', u)
        .then(res => {console.log("Applicant is updated");})
        .catch(err => {console.log(err.data);} )
        this.setState({c : "1"});
    }
    reject (z) {
        const newUser = {
            app_id : this.state.sort_app[z].app_id,
            status : "Rejected"
        }
        axios.post('http://localhost:4000/user/up_application', newUser)
        .then(res => { alert("Application is updated"); console.log("Application is updated");})
        .catch(res => {alert("Status is not changed");console.log(res.data);})
        this.setState({c : "1"});
    }

    createTable = () => {
        let table = [];
        let g=0;
        for (var x in this.state.sort_app) {
            let children = []
            if (this.state.sort_app[x].status.localeCompare("Rejected") != 0) {
                children.push(<h3>{g+1}.</h3>)
                children.push(<><b>Applicant Name: </b> {this.state.sort_app[x].name}</>);
                children.push(<div> </div>);
                children.push(<><b>Date of Application:</b> {this.state.sort_app[x].date_app}</>);
                children.push(<div> </div>);
                children.push(<b>Education:</b>);
                let child =[];
                let arra =[];
                child.push(<th>Institute </th>);
                child.push(<th>Start Year </th>);
                child.push(<th>End Year</th>);
                arra.push(<tr>{child}</tr>);
                for(var y in this.state.sort_app[x].Institute) {
                    let child =[];
                    child.push(<td>{this.state.sort_app[x].Institute[y]}</td>);
                    child.push(<td>{this.state.sort_app[x].Start_year[y]}</td>);
                    child.push(<td>{this.state.sort_app[x].End_year[y]}</td>);
                    arra.push(<tr>{child}</tr>);
                }
                children.push(<table>{arra}</table>);
                children.push(<div> </div>);
                children.push(<b>Skills: </b>);
                var f=0;
                for (var y in this.state.sort_app[x].skills) {
                    if ( f == 0) {
                        children.push(<>{this.state.sort_app[x].skills[y]} </>);
                    }
                    else {
                        children.push(<>,{this.state.sort_app[x].skills[y]} </>);
                    }
                    f=f+1;
                }
                children.push(<div></div>);
                children.push(<b>SOP: </b>);
                children.push(<>{this.state.sort_app[x].sop}</>);
                children.push(<ReactStars value={this.state.sort_app[x].rate_value}  count={5}  activeColor="#ffd700" />);
                children.push(<button>{this.state.sort_app[x].status}</button>);
                let chil =[];
                let arr =[];
                const z=g;
                if (this.state.sort_app[x].status.localeCompare("Applied") == 0) {
                    chil.push(<td><button style={{ backgroundColor :'blue'}} onClick={() => this.short_list(z)} >Shortlist</button></td>);
                    chil.push(<td><button style={{ backgroundColor :'green'}} onClick={() => this.accept(z)} >Accept</button></td>);
                    chil.push(<td><button style={{ backgroundColor :'red'}} onClick={() => this.reject(z)} >Reject</button></td>);
                }
                else if (this.state.sort_app[x].status.localeCompare("Shortlisted") == 0) {
                    chil.push(<td><button style={{ backgroundColor :'green'}} onClick={() => this.accept(z)} >Accept</button></td>);
                    chil.push(<td><button style={{ backgroundColor :'red'}} onClick={() => this.reject(z)} >Reject</button></td>);
                }
                arr.push(<tr>{chil}</tr>);
                children.push(<table>{arr}</table>);
                table.push(<div>{children}</div>);
                g=g+1;
            }
        }
        return table
      }

    render() {
        return (
            <Router>
                <Route path="/recruiter/activejob" exact component={ActiveJob}/>
                <div>
                    <div>
                        <h3>Sort</h3>
                        <div>
                            <label>Name</label>
                                <button onClick={(e) => this.sort_name_inc(e)}>&#8657;</button>
                                <button onClick={(e) => this.sort_name_dec(e)}>&#8659;</button>
                            <label>Date of Application</label>
                                <button onClick={(e) => this.sort_doa_inc(e)}>&#8657;</button>
                                <button onClick={(e) => this.sort_doa_dec(e)}>&#8659;</button>
                            <label>Rating</label>
                                <button onClick={(e) => this.sort_rat_inc(e)}>&#8657;</button>
                                <button onClick={(e) => this.sort_rat_dec(e)}>&#8659;</button>
                        </div>
                    </div>
                    <div>
                        {this.createTable()}
                    </div>
                </div>
           </Router>
        )
    }
}