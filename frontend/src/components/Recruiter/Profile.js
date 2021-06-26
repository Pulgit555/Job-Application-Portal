import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

var a='';
export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            name : query["name"],
            email : query["email"],
            contact_no : query["contact_no"],
            bio : query["bio"]
            }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeContactno = this.onChangeContactno.bind(this);
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { query } = this.props.location;
        axios.post('http://localhost:4000/user/rec', query)
            .then(res => { 
                console.log(res.data);
                this.setState({ name: res.data.name });               
                this.setState({ email: res.data.email });
                this.setState({ contact_no: res.data.contact_no });
                this.setState({ bio: res.data.bio });
            })
            .catch(err => console.log(err));
    }
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }
    onChangeContactno(event) {
        this.setState({ contact_no: event.target.value });
    }
    onChangeBio (event) {
        let text = event.target.value;
          let words = text.split(' ').filter(Boolean);
          if (words.length > 250) {
            this.setState({ bio: words.slice(0, 250).join(' ') });
          } 
          else {
            this.setState({ bio: event.target.value });
          }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            contact_no : this.state.contact_no,
            bio : this.state.bio 
        }
        console.log(newUser);
        const { history } = this.props;
        axios.post('http://localhost:4000/user/edit_rec', newUser)
            .then(res => { 
                alert("Successfully edited");console.log(res.data);
                // history.push({
                //     "pathname" : '/recruiter' ,
                //     "info": res.data
                // })
            })
            .catch(err => {alert(err); console.log(err)});

        this.setState({
            name : newUser.name,
            email : newUser.email,
            contact_no : newUser.contact_no,
            bio : newUser.bio 
        });
    }

    render() {
        return (
            <Router>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={this.onChangeName}
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
                            <label>Contact Number: </label>
                            <input type="tel" pattern="[0-9]{5}-[0-9]{5}"
                                placeholder="99999-11111"
                                className="form-control" 
                                value={this.state.contact_no}
                                onChange={this.onChangeContactno}
                            />  
                        </div>
                        <div className="form-group">
                            <label>Bio: </label>
                            <textarea rows="5" cols="50"  className="form-control" 
                                value={this.state.bio}
                                onChange={this.onChangeBio}> 
                                {/* {this.state.bio} */}
                            </textarea> 
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Edit the Details" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </Router>
        )
    }
}