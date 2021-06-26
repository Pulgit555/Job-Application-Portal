const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    email: {
		type: String,
		required: true
	},
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
		type: Date,
		required: false
	},
	deadline: {
		type: Date,
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
		type: Rating,
		required: false
	},
});

module.exports = Job = mongoose.model("Jobs", JobSchema);