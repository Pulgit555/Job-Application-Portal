import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


export default class SelectedEmployees extends Component {
    
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            r_email : query['email'],
            app:[],
            sort_app: []
        }
        // this.after_apply = this.after_apply.bind(this);
        //this.createTable = this.createTable.bind(this);
    }

    componentDidMount() {
        const a={
            email : this.state.r_email
        };
        axios.post('http://localhost:4000/user/selected_em', a)
        .then(res => { 
            // console.log(res.data);
            this.setState({ app : res.data });
            this.setState({ sort_app : res.data }); 
        })
        .catch(err => {alert("No Employee Selected") ;console.log(err)});
    }

    sort_nam_inc (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.name > b.name ? 1 : -1);
        this.setState({sort_app:app_arr});
    }
    sort_nam_dec (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.name > b.name ? -1 : 1);
        this.setState({sort_app:app_arr});
    }
    sort_job_inc (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.title > b.title ? 1 : -1);
        this.setState({sort_app:app_arr});
    }
    sort_job_dec (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.title > b.title ? -1 : 1);
        this.setState({sort_app:app_arr});
    }
    sort_dat_inc (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.date_join > b.date_join ? 1 : -1);
        this.setState({sort_app:app_arr});
    }
    sort_dat_dec (e) {
        var app_arr = this.state.sort_app;
        app_arr.sort((a, b) => a.date_join > b.date_join ? -1 : 1);
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
    rating_change(c,newRating) {
        var a=0;
        for (var x in c[2]) {
            if (c[2][x].localeCompare(c[1]) == 0) {
                a=a+1;
            }
        }
        if (a > 0) {
            alert("You have already rated");
        }
        else {
            var b= {used : '',Rate : '',rate_value :''};
            if(c[3])
            {
                b.used = c[3]+1;
                b.Rate = c[4]+newRating;
                b.rate_value = b.Rate/b.used;
            }
            else{
                b.used = 1;
                b.Rate = newRating;
                b.rate_value = b.Rate/b.used;
            }
            var d =[],
            d = c[2];
            d.push(c[1]);
            var inf = {
                a_mail : c[0],
                rating_mail : d,
                used : b.used,
                Rate : b.Rate,
                rate_value : b.rate_value
            }
            console.log(inf);
            axios.post('http://localhost:4000/user/update_emp_appl', inf)
            .then(res => {
                alert("rating is changed");
            })
            .catch(err =>  {alert("rating is not changed");})
        }
    }
    createTable = () => {
        let table = [];
        let child = [] ;
        child.push(<th>Employee Name</th>);
        child.push(<th>Date of Joining</th>);
        child.push(<th>Job Type</th>);
        child.push(<th>Job Title</th>);
        child.push(<th>Rating</th>);
        table.push(<tr>{child}</tr>);
        for (var x in this.state.sort_app) {
            let children = [];
            children.push(<td>{this.state.sort_app[x].name}</td>);
            children.push(<td>{this.state.sort_app[x].date_join}</td>);
            children.push(<td>{this.state.sort_app[x].type_job}</td>);
            children.push(<td>{this.state.sort_app[x].title}</td>);
            let c = [this.state.sort_app[x].email , this.state.r_email , this.state.sort_app[x].rating_mail ,this.state.sort_app[x].used ,this.state.sort_app[x].Rate , this.state.sort_app[x].rate_value];
            children.push(<ReactStars value={this.state.sort_app[x].rate_value}  count={5}  activeColor="#ffd700" onChange={(newRating) => this.rating_change(c,newRating)}/>);
            // var y;
            // var z=0;
            // var k=0;
            // var r=0;
            // for (y in this.state.application) {
            //     if(this.state.application[y].job_id)  {
            //         if (this.state.application[y].job_id.localeCompare(this.state.sort_job[x].job_id) == 0)
            //         {
            //             k=k+1;
            //             if (this.state.application[y].a_mail.localeCompare(this.state.a_email) == 0) {
            //                 z=1;
            //             }
            //         }
            //         if (this.state.application[y].a_mail.localeCompare(this.state.a_email) == 0) {
            //             r=r+1;
            //         }
            //     }
            // }
            table.push(<tr>{children}</tr>)
        }
        return table
      }
    render() {
        return (
            <Router>
            <div>
                <div>
                    <h3>Sort</h3>
                    <div>
                        <label>Name</label>
                        <button onClick={(e) => this.sort_nam_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_nam_dec(e)}>&#8659;</button>
                        <label>Job Title</label>
                        <button onClick={(e) => this.sort_job_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_job_dec(e)}>&#8659;</button>
                        <label>Date of Joining</label>
                        <button onClick={(e) => this.sort_dat_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_dat_dec(e)}>&#8659;</button>
                        <label>Rating</label>
                        <button onClick={(e) => this.sort_rat_inc(e)}>&#8657;</button>
                        <button onClick={(e) => this.sort_rat_dec(e)}>&#8659;</button>
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