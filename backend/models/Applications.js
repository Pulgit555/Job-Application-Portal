const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema ({
	status: {
		type: String,
        required: false,
        default : "Applied" //Accepted,Rejected,Shortlisted,Cancelled
	},
	date_join: {
		type: String,
		required: false
	},
	sop: {
		type: String,
		required: false
    }, 
    r_mail: {
		type: String,
		required: false
    }, 
    a_mail: {
		type: String,
		required: false
    }, 
    job_id: {
		type: String,
		required: false
    },
    rate_done : {
        type: String,
        required: false,
        default : "0"
	},
	date_app : {
		type : String,
		required : false
	}
});

module.exports = Application = mongoose.model("Application", ApplicationSchema);