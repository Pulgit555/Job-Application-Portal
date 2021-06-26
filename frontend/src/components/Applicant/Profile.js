import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        const { query } = this.props.location;
        this.state = {
            name : query['name'],
            email : query['email'],
            edu_ins : [],
            edu_sy : [],
            edu_ey : [],
            skills : query['skills'],
            rate_value : query['rate_value'],
            image : query['image'],
            pdf : query['pdf']
        }
        this.onChangeName = this.onChangeName.bind(this);
        // this.onChangePdf = this.onChangePdf.bind(this); 
        // this.onChangeImage = this.onChangeImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }
    componentDidMount() {
        const { query } = this.props.location;
        axios.post('http://localhost:4000/user/app', query)
            .then(res => { 
                console.log(res.data);
                this.setState({ name: res.data.name });               
                this.setState({ email: res.data.email });
                this.setState({ edu_ins: res.data.Institute });
                this.setState({ edu_sy: res.data.Start_year });
                this.setState({ edu_ey: res.data.End_year });
                this.setState({ skills: res.data.skills });
                this.setState({ rate_value: res.data.rate_value });
                this.setState({ image: res.data.image });
                this.setState({ pdf: res.data.pdf });
            })
            .catch(err => console.log(err));
    }
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }
    // onChangePdf(event) {
    //     this.setState({ pdf: event.target.value});
    //     console.log(event.target.files);
    // }
    // onChangeImage(event) {
    //     this.setState({ image: event.target.value });
    // }
    addskills() {
        this.setState({skills: [...this.state.skills, ""]});
    }
    handleChange(e,index) {
        this.state.skills[index] = e.target.value;
        this.setState({skills: this.state.skills});
    } 
    handleRemove(index) {
        this.state.skills.splice(index,1);
        this.setState({skills : this.state.skills});
    }
    addedu() {
        this.setState({edu_ins: [...this.state.edu_ins, ""]});
        this.setState({edu_sy: [...this.state.edu_sy, ""]});
        this.setState({edu_ey: [...this.state.edu_ey, ""]});
    }
    handleChange_ins(e,index) {
        this.state.edu_ins[index] = e.target.value;
        this.setState({edu_ins: this.state.edu_ins});
    }
    handleChange_st(e,index) {
        this.state.edu_sy[index] = e.target.value;
        this.setState({edu_sy: this.state.edu_sy});
    } 
    handleChange_en(e,index) {
        this.state.edu_ey[index] = e.target.value;
        this.setState({edu_ey: this.state.edu_ey});
    }  
    handleRemove_edu(index) {
        this.state.edu_ins.splice(index,1);
        this.setState({edu_ins: this.state.edu_ins});
        this.state.edu_sy.splice(index,1);
        this.setState({edu_sy: this.state.edu_sy});
        this.state.edu_ey.splice(index,1);
        this.setState({edu_ey: this.state.edu_ey});
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            name : this.state.name,
            email : this.state.email,
            edu_ins : this.state.edu_ins,
            edu_sy : this.state.edu_sy,
            edu_ey : this.state.edu_ey,
            skills : this.state.skills,
            rate_value : this.state.rate_value,
            image : this.state.image,
            pdf : this.state.pdf 
        }
        console.log(newUser);
        const { history } = this.props;
        axios.post('http://localhost:4000/user/edit_app', newUser)
            .then(res => { 
                alert("Successfully edited");console.log(res.data);
                // history.push({
                //     "pathname" : '/recruiter' ,
                //     "info": res.data
                // })
            })
            .catch(err => {alert(err); console.log(err)});

        this.setState({
            name : newUser['name'],
            email : newUser['email'],
            edu_ins : newUser['edu_ins'],
            edu_sy : newUser['edu_sy'],
            edu_ey : newUser['edu_ey'],
            skills : newUser['skills'],
            rate_value : newUser['rate_value'],
            image : newUser['image'],
            pdf : newUser['pdf']
        });
    }
    render() { 
        return (
            <Router>
                <div>
                    <form>
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
                        <label>Rating: </label>
                        <input type="Number" 
                            className="form-control" 
                            value={this.state.rate_value}
                            readOnly = {true}
                        />  
                    </div>
                    {/* <div className="form-group">
                        <label>Upload Resume: </label>
                        <input type="hidden" 
                            className="form-control" 
                            value={this.state.pdf}
                            onChange={this.onChangePdf}
                        />
                    </div>
                    <div className="form-group">
                        <label>Upload Profile Pic: </label>
                        <input type="hidden"  
                            className="form-control" 
                            value={this.state.image}
                            onChange={this.onChangeImage}
                        />
                        <img src={this.state.image}/>
                    </div>   */}
                    </form>
                    <div>
                        <label>Skills :</label>
                        {this.state.skills.map((skills,index) => {
                            console.log(skills);
                                return (
                                    <div key={index}>
                                    <input  value={skills} onChange={(e) => this.handleChange(e,index)}/>
                                    <button onClick={()=> this.handleRemove(index)}> Remove</button>
                                </div>
                                );
                            })}
                        <hr/>
                        <button onClick={(e) => this.addskills(e)}>Add Skills</button>
                    </div>
                    <div>
                        <label>Education :</label>
                        {this.state.edu_ins.map((educ,index) => {
                            console.log(educ);
                                return (
                                    <div key={index}>
                                    <input  value={educ} onChange={(e) => this.handleChange_ins(e,index)}/>
                                    <input type="number"  value={this.state.edu_sy[index]} onChange={(e) => this.handleChange_st(e,index)}/>
                                    <input type="number" value={this.state.edu_ey[index]} onChange={(e) => this.handleChange_en(e,index)}/>
                                    <button onClick={()=> this.handleRemove_edu(index)}> Remove</button>
                                </div>
                                );
                            })}
                        <hr/>
                        <button onClick={(e) => this.addedu(e)}>Add Education instance</button>
                    </div>
                    <br></br>
                    <button onClick={this.onSubmit}>Submit</button>
                </div>
            </Router>
        )
    }
}