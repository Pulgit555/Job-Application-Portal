const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Job = new Schema({
	title: {
		type: String,
		required: false
	},
	// Maximum number of Applications
	max_app: {
		type: Number,
		required: false
	},
	// Maximum number of Positions
	max_pos: {
		type: Number,
		required: false
	},
	date_pos: {
		type: String,
		required: false
	},
	deadline: {
		type: String,
		required: false
	},
	skills: {
		type: [String],
		required: false
	},
	type_job: {
		type: String,
		required: false
	},
	duration: {
		type: Number,
		required: false
	},
	salary: {
		type: Number,
		required: false
	},
	rates: {
		Rate: {
			type: Number,
			required: false
		},
		//number of user
		used: {
			type: Number,
			required: false,
			default: 0
		},
		rate_value: {
			type: Number,
			required: false,
			default: 0
		}
	},
	rem_pos : {
		type: Number,
		required: false
	}
});

const RecruiterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	contact_no: {
		type: String,
		required: false
	},
	bio: {
		type: String,
		required: false
	},
	jobs: {
		type: [Job],
		required: false
	}
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);