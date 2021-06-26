const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema({
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
	Institute: {
		type: [String],
		required: false
	},
	Start_year: {
		type: [Number],
		required: false
	},
	End_year: {
		type: [Number],
		required: false
	},
	skills: {
		type: [String],
		required: false
	},
	Rate: {
		type: Number,
		required: false,
		default : 0
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
	},
	image: {
		type: Buffer,
		required: false
	},
	pdf: {
		type: Buffer,
		required: false
	},
	stat: {
		type:String,
		required:false,
		default : "W"//A
	},
	no_app : {
		type : Number,
		required :false,
		default : 0
	},
	rating_mail : {
		type : [String],
		required : false
	}
});


module.exports = Applicant = mongoose.model("Applicant", ApplicantSchema);