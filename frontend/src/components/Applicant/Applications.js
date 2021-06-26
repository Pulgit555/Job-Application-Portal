import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export default class Applications extends Component {
    
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            a_mail:query['email'],
            app : [],
            sort_app : []
        }
    }

    componentDidMount() {
        const a={
            email : this.state.a_mail
        };
        axios.post('http://localhost:4000/user/get_application', a)
        .then(res => { 
            console.log(res.data);
            this.setState({ app : res.data });
            this.setState({ sort_app : res.data });
        })
        .catch(err => {alert("No Applications available") ;console.log(err)});
    }

    rating_change(c,newRating) {
        if (c[4].localeCompare("1") == 0)
        {
            alert("You have already rated this job");
        }
        else {
            var a= {used : '',Rate : '',rate_value :''};
            if(c[2])
            {
                a.used = c[2]+1;
                a.Rate = c[3]+newRating;
                a.rate_value = a.Rate/a.used;
            }
            else{
                a.used = 1;
                a.Rate = newRating;
                a.rate_value = a.Rate/a.used;
            }
            console.log(a);
            var inf = {
                job_id : c[0],
                r_mail : c[1],
                used : a.used,
                Rate : a.Rate,
                rate_value : a.rate_value,
                rate_done : "1",
                app_id : c[5]
            }
            console.log(inf);
            axios.post('http://localhost:4000/user/update_application', inf)
            .then(res => { 
                console.log(res.data);
            })
            .catch(err => {console.log(err)});

            axios.post('http://localhost:4000/user/update_job', inf)
            .then(res => { 
                console.log(res.data);
                alert("rating is changed");
            })
            .catch(err => {alert("rating is not changed") ;console.log(err)});
        }
    }
    createTable = () => {
        let table = [];
        let child = [] ;
        child.push(<th>Title</th>);
        child.push(<th>Date of Joining</th>);
        child.push(<th>Salary</th>);
        child.push(<th>Recruiter</th>);
        child.push(<th>Status</th>);
        child.push(<th>Rating</th>);
        table.push(<tr>{child}</tr>);
        var c=[];
        for (var x in this.state.sort_app) {
            let children = [];
            children.push(<td>{this.state.sort_app[x].title}</td>);
            children.push(<td>{this.state.sort_app[x].date_join}</td>);
            children.push(<td>{this.state.sort_app[x].salary}</td>);
            children.push(<td>{this.state.sort_app[x].r_name}</td>);
            children.push(<td>{this.state.sort_app[x].status}</td>);
            console.log(this.state.sort_app[x].rate_value);
            console.log(this.state.sort_app[x].rate_done);
            c = [this.state.sort_app[x].job_id , this.state.sort_app[x].r_mail , this.state.sort_app[x].used , this.state.sort_app[x].Rate , this.state.sort_app[x].rate_done , this.state.sort_app[x].app_id];
            if(this.state.sort_app[x].status.localeCompare("Accepted") == 0) {
                if (this.state.sort_app[x].rate_done.localeCompare("1") == 0) {
                    if (this.state.sort_app[x].rate_value) {
                        children.push(<td><ReactStars value={this.state.sort_app[x].rate_value}  count={5} editing={false}  activeColor="#ffd700" onChange={(newRating) => this.rating_change(c,newRating)}/></td>);
                    }
                    else {
                        children.push(<td><ReactStars value={0} count={5}  activeColor="#ffd700" editing={false} onChange={(newRating) => this.rating_change(c,newRating)}/></td>);
                    }
                }
                else {
                    if (this.state.sort_app[x].rate_value) {
                        children.push(<td><ReactStars value={this.state.sort_app[x].rate_value}  count={5}  activeColor="#ffd700" onChange={(newRating) => this.rating_change(c,newRating)}/></td>);
                    }
                    else {
                        children.push(<td><ReactStars value={0} count={5}  activeColor="#ffd700" onChange={(newRating) => this.rating_change(c,newRating)}/></td>);
                    }
                }
            }
            else {
                if (this.state.sort_app[x].rate_value) {
                    children.push(<td><ReactStars value={this.state.sort_app[x].rate_value}  count={5} editing={false} activeColor="#ffd700"/></td>);
                }
                else {
                    children.push(<td><ReactStars value={0} count={5}  activeColor="#ffd700" editing={false} /></td>);
                }
            }
        //   children.push(<td><button onClick={() => this.after_apply(a)} style={{ backgroundColor :'green'}}>Apply</button></td>);
          table.push(<tr>{children}</tr>)
        }
        return table
      }

    render() {
        return (
            <Router>
                <div>
                    <table>
                        {this.createTable()}
                    </table>
                </div>
           </Router>
        )
    }
}