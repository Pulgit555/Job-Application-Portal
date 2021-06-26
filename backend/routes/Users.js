var express = require("express");
var router = express.Router();

const User = require("../models/Users");
const Applicant = require("../models/Applicants");
const Recruiter = require("../models/Recruiters");
const Application = require("../models/Applications");

//Adding a user
router.post("/register", (req, res) => {
	Applicant.findOne({"email":req.body.email}).then(user =>{
		if(user) {
			return res.status(200).send("1");
		}
		else {
			Recruiter.findOne({"email":req.body.email}).then(user =>{
				if(user) {
					return re.status(200).send("1");
				}
				else {
					if (req.body.type.localeCompare("Job Applicant") ==0 ) {
						const newUser = new Applicant({
							name: req.body.name,
							email: req.body.email,
							password: req.body.password,
							type: req.body.type
						})
						newUser.save(function(err, doc){
							if(err) {
								return res.status(404).send("unable to save data");
							}
							else {
								return res.status(200).json(doc);
							}
						});
					}
					else {
						const newUser = new Recruiter({
							name: req.body.name,
							email: req.body.email,
							password: req.body.password,
							type: req.body.type
						});
						newUser.save().then(user => {
							return res.status(200).json(user);
						})
						.catch(err => {
							return res.status(404).send("unable to save data");
						});
					}
					
				}
			})
		}
	});
});

//Login
router.post("/login",(req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	Applicant.findOne({ "email":email , "password":password}).then(user => {
		if (!user) {
			Recruiter.findOne({"email":email , "password":password}).then(user => {
				if(!user) {
					return res.status(200).send("1");
				}
				else {
					res.status(200).json(user);
            		return user;
				}
			});
       	}
        else{
            res.status(200).json(user);
            return user;
        }
	});
})

//Adding a new job to data
router.post("/add_job",(req, res) => {
	Recruiter.findOne({"email":req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).send("!");
		}
		else {
			// const job = req.body.jobs;
			user.jobs.push({
				title : req.body.title,
				max_app : req.body.max_no_app,
				max_pos : req.body.max_no_pos,
				date_pos : req.body.date_of_posting,
				deadline : req.body.deadline,
				skills : req.body.req_skills,
				type_job : req.body.type_of_job,
				duration : req.body.duration,
				salary : req.body.salary,
				rem_pos : req.body.max_no_pos
			});
			console.log(user);
			Recruiter.findByIdAndUpdate({_id : user._id},user,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})
//edit the job details
router.post("/edit_job",(req, res) => {
	Recruiter.findOne({"email":req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).send("!");
		}
		else {
			// const job = req.body.jobs;
			user.jobs = req.body.job;
			console.log(user);
			Recruiter.findByIdAndUpdate({_id : user._id},user,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})

//update the job details 
router.post("/update_job",(req,res) => {
	console.log(req.body);
	Recruiter.findOne({"email" : req.body.r_mail})
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else {
			var x;
			for (x in user.jobs) {
				console.log(user.jobs[x].rates);
				console.log(x);
				if(req.body.job_id.localeCompare(user.jobs[x]._id) == 0) {
					user.jobs[x].rates.used = req.body.used;
					user.jobs[x].rates.Rate = req.body.Rate;
					user.jobs[x].rates.rate_value = req.body.rate_value;
				}
			}
			console.log(user.jobs);
			Recruiter.findByIdAndUpdate({_id : user._id},user,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})
//getting all the jobs.
router.post("/all_job",(req, res) => {
	Recruiter.find({})
	.then(users => {
		if (!users) {
			return res.status(404).send("!");
		}
		else {
			var job = [];
			var x;
			for (x in users) {
				for(var y in users[x].jobs) {
					var b = { 
						name : users[x].name , 
						email : users[x].email,
						salary : users[x].jobs[y].salary,
						duration : users[x].jobs[y].duration,
						type_job : users[x].jobs[y].type_job,
						title : users[x].jobs[y].title,
						max_pos : users[x].jobs[y].max_pos,
						max_app : users[x].jobs[y].max_app,
						deadline : users[x].jobs[y].deadline,
						date_pos : users[x].jobs[y].date_pos,
						skills : users[x].jobs[y].skills,
						rates : users[x].jobs[y].rates,
						job_id : users[x].jobs[y]._id,
						rem_pos : users[x].jobs[y].max_pos
					};
					job.push(b);
				}
			}
			console.log(job);
			return res.status(200).json(job);
		}
	})
})

//getting details of recruiter
router.post("/rec",(req, res) => {
	Recruiter.findOne({"email":req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).send("!");
		}
		else {
			return res.status(200).json(user);
		}
	})
})
//editing profile of recruiter
router.post("/edit_rec",(req, res) => {
	console.log(req.body);
	Recruiter.findOne({"email":req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).send("!");
		}
		else {
			// const job = req.body.jobs;
			Recruiter.findByIdAndUpdate({_id : user._id},req.body,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})

//getting details of applicant
router.post("/app",(req, res) => {
	Applicant.findOne({"email":req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).send("!");
		}
		else {
			return res.status(200).json(user);
		}
	})
})
//editing profile of applicant
router.post("/edit_app",(req, res) => {
	console.log(req.body);
	Applicant.findOne({"email":req.body.email})
	.then(user => {
		if (!user) {
			return res.status(404).send("!");
		}
		else {
				user.name = req.body['name'],
				user.email = req.body['email'],
				user.skills = req.body['skills'],
				user.image = req.body['image'],
				user.pdf = req.body['pdf'],
				user.Institute = req.body['edu_ins'],
				user.Start_year = req.body['edu_sy'],
				user.End_year = req.body['edu_ey']
				console.log(user);
			console.log(user);
			// const job = req.body.jobs;
			Applicant.findByIdAndUpdate({_id : user._id},user,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})

// getting all applications
router.post("/all_applications",(req,res) => {
	Application.find({})
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else{
			console.log(user)
			return res.status(200).json(user);
		}
	})
})

// Saving the application
router.post("/save_application",(req,res) => {
	const newUser = new Application({
		r_mail: req.body.r_email,
		a_mail: req.body.a_email,
		job_id: req.body.job_id,
		sop: req.body.sop,
		date_app : new Date()
	})
	console.log(newUser);
	newUser.save(function(err, doc){
		if(err) {
			return res.status(404).send("unable to save data");
		}
		else {
			return res.status(200).json(doc);
		}
	});
})

//updating rate_done of application 
router.post("/update_application",(req,res) => {
	console.log(req.body);
	Application.findOne({_id : req.body.app_id})
	.then(user => {
		if(!user) {
			return res.status(400).send("err");
		}
		else {
			user.rate_done = req.body.rate_done;
			Application.findByIdAndUpdate({_id : user._id},user,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})

//updating status of application 
router.post("/up_application",(req,res) => {
	console.log(req.body);
	Application.findOne({_id : req.body.app_id})
	.then(user => {
		if(!user) {
			return res.status(400).send("err");
		}
		else {
			user.status = req.body.status;
			user.date_join = req.body.date_join;
			Application.findByIdAndUpdate({_id : user._id},user,function(err,result) {
				if (err) {
					return res.status(400).send(err);	
				}
				else {
					return res.status(200).send(user);
				}
			})
		}
	})
})

// updating the status of application when job is deleted
router.post("/del_application", (req,res) => {
	console.log(req.body);
	Application.find({job_id : req.body.job_id})
	.then(user => {
		if(!user) {
			return res.status(400).send("err");
		}
		else {
			var a=1;
			for (var x in user) {
				user[x].status = req.body.status;
				Application.findByIdAndUpdate({_id : user[x]._id},user[x],function(err,result) {
					if (err) {
						return res.status(400).send(err);	
					}
					else {
						if(user.length == a) {
							return res.status(200).send(user);
						}
					}
					a=a+1;
				})
			}
		}
	})
})

//getting applications of particular user
router.post("/get_application", (req,res) => {
	Application.find({a_mail : req.body.email })
	.then(users => {
		if(!users){
			return res.status(404).send("!"); 
		}
		else {
			var a = [];
			var x,c=0,e=0;
			var b=[];
			for (x in users) {
				console.log(x);
				Recruiter.findOne({ "email" : users[x].r_mail })
				.then(user => {
					if (user) {
						if(user.jobs) {
							var y;
							var g=0;
							// console.log(x,c);
							for (y in user.jobs) {
								console.log(user.email,c,users[c].job_id.localeCompare(user.jobs[y]._id),y);
								if (users[c].job_id.localeCompare(user.jobs[g]._id) == 0) {
									b.push({
										a_mail : users[c].a_mail,
										r_mail : users[c].r_mail,
										status : users[c].status,
										sop : users[c].sop,
										date_join : users[c].date_join,
										job_id : users[c].job_id,
										title : user.jobs[g].title,
										salary : user.jobs[g].salary,
										r_name : user.name,
										Rate : user.jobs[g].rates.Rate,
										used : user.jobs[g].rates.used,
										rate_value : user.jobs[g].rates.rate_value,
										rate_done : users[c].rate_done,
										app_id : users[c]._id
									})
									// console.log(user.email);
									// console.log(g);
									console.log({
										a_mail : users[c].a_mail,
										r_mail : users[c].r_mail,
										status : users[c].status,
										sop : users[c].sop,
										date_join : users[c].date_join,
										job_id : users[c].job_id,
										title : user.jobs[g].title,
										salary : user.jobs[g].salary,
										r_name : user.name,
										Rate : user.jobs[g].rates.Rate,
										used : user.jobs[g].rates.used,
										rate_value : user.jobs[g].rates.rate_value,
										rate_done : users[c].rate_done,
										app_id : users[c]._id
									},g,user.email,c);
								}
								g=g+1;
							}
						}
					}
					e=e+1;
					c=c+1;
					if(users.length == e)
					{
						console.log(b);
						return res.status(200).json(b);
					}
				})
			}
		}
	})
})

//  getting all applications of particular job 
router.post("/job_applications",(req,res) => {
	Application.find({job_id : req.body.job_id})
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else{
			var x,e=0; 
			var b=[];
			for(x in user) {
				Applicant.findOne({email : user[x].a_mail})
				.then(users => {
					if(users) {
						b.push({
							name : users['name'],
							email : users.email,
							Institute : users.Institute,
							Start_year : users.Start_year,
							End_year : users.End_year,
							skills : users.skills,
							date_app : user[e].date_app,
							sop : user[e].sop,
							status : user[e].status,
							Rate : users.Rate,
							used : users.used,
							rate_value : users.rate_value,
							app_id : user[e]._id,
							job_id : user[e].job_id
						})
					}
					e=e+1;
					if(user.length == e)
					{
						console.log(b);
						return res.status(200).json(b);
					}
				})
			}
		}
	})
})

router.post("/selected_em",(req,res) => {
	Application.find({r_mail : req.body.email ,status : "Accepted" })
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else{
			var e=0; 
			var b=[];
			Recruiter.findOne({email : req.body.email})
			.then(rec => {
				if(!rec) {
					return res.status(404).send("!");
				}
				else {
					var x;
					for(x in user) {
						Applicant.findOne({email : user[x].a_mail})
						.then(users => {
							if(users) {
								for (var j in rec.jobs)
								{
									if(user[x].job_id.localeCompare(rec.jobs[j]._id)==0) {
										b.push({
											name : users['name'],
											email : users.email,
											date_join : user.date_join,
											title : rec.jobs[j].title,
											rate_value : users.rate_value,
											type_job : rec.jobs[j].type_job,
											used : users.used,
											Rate : users.Rate,
											rating_mail : users.rating_mail
										})
									}
								}
							}
							e=e+1;
							if(user.length == e)
							{
								console.log(b);
								return res.status(200).json(b);
							}
						})
					}
				}
			}) 
		}
	})
})

// updating remainig number of positions & status of applications
router.post("/up_job_pos",(req,res) => {
	Recruiter.findOne({email : req.body.r_mail})
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else {
			for (var x in user.jobs) {
				if(req.body.job_id.localeCompare(user.jobs[x]._id) == 0) {
					if (user.jobs[x].rem_pos == 1) {
						Application.find({job_id : user.jobs[x]._id})
						.then(users => {
							if(!users) {
								return res.status(404).send("!");
							}
							else{
								for (var y in users) {
									if(users[y].status.localeCompare("Applied") == 0 || users[y].status.localeCompare("Shortlisted") == 0) {
										users[y].status = "Rejected";
										Application.findByIdAndUpdate({_id : users[y]._id},users[y],function(err,result) {
											if(err) {
												return res.status(404).send("!");
											}
										})
									}
								}
							}
						})
					}
						user.jobs[x].rem_pos = user.jobs[x].rem_pos-1;
						Recruiter.findByIdAndUpdate({_id : user._id},user,function(err,doc) {
							if(err) {
								return res.status(404).send("!");
							}
						})
				}
			}
			return res.status(200).send("doc");
		}
	})
})

// updating the status of Applicant 
router.post("/up_stat_applicant",(req,res) => {
	Applicant.findOne({email : req.body.a_mail})
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else {
			user.stat = "A";
			Applicant.findByIdAndUpdate({_id : user._id},user,function(err,doc) {
				if(err) {
					return res.status(404).send("!");
				}
			})
			console.log(req.body.a_mail);
			Application.find({a_mail : req.body.a_mail})
					.then(users => {
						if(!users) {
							return res.status(404).send("!");
						}
						else {
							for (var y in users) {
								console.log(users[y]);
								if(users[y].status.localeCompare("Applied") == 0 || users[y].status.localeCompare("Shortlisted") == 0) {
									users[y].status = "Rejected";
									Application.findByIdAndUpdate({_id : users[y]._id},users[y],function(err,result) {
										if(err) {
											return res.status(404).send("!");
										}
									})
								}
							}
							return res.status(200).send("A");
						}
					})
		}
	})
})

router.post("/edit_app_status",(req,res) => {
	console.log(req.body);
	var c=1;
	var d =req.body;
	for (var x in d)
	{
		Application.find({job_id : d[x].job_id})
		.then(user => {
			if(!user) {
				return res.status(404).send("!");
			}	
			else {
				for (var y in user) {
					Applicant.findOne({email : user[y].a_mail})
					.then(users => {
						if(!users) {
							return res.status(404).send("!");
						}
						else {
							if(users.stat.localeCompare("A") == 0) {
								users.stat = "W";
								Applicant.findByIdAndUpdate({_id : users._id},users,function(err,doc) {
									if(err) {
										return res.status(404).send("!");
									}
								})
							}
						}
					})
				}
				if (c == req.body.length) {
					return res.status(200).send("doc");
				}
			}
		})
		c=c+1;
	}
})

router.post("/update_emp_appl",(req,res) => {
	console.log(req.body);
	Applicant.findOne({email : req.body.a_mail})
	.then(user => {
		if(!user) {
			return res.status(404).send("!");
		}
		else {
			user.rating_mail = req.body.rating_mail;
			user.used = req.body.used;
			user.Rate = req.body.Rate;
			user.rate_value = req.body.rate_value;
			Applicant.findByIdAndUpdate({_id : user._id},user, function(err,doc) {
				if(err) {
					return res.status(404).send("!");
				}
				else {
					return res.status(200).send(doc);
				}
			})
		}
	})
})
module.exports =router;
