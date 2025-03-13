const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid')

const schoolSchema = new Schema({
    _id: {
        type:String,
        default: ()=>uuidv4()
    },
    tp_code : {
        type: String
    },
    centre_code : {
        type:String
    },
    centre_name : {
        type:String
    },
    organisation_code: {
        type:String
    },
    organisation_description: {
        type:String
    },
    centre_contact_no: {
        type:String
    },
    centre_email_address: {
        type:String
    },
    centre_address: {
        type:String
    },
    postal_code: {
        type:String
    },
    centre_website: {
        type:String
    },
    food_offered: {
        type:String
    },
    second_languages_offered: {
        type:String
    },
    spark_certified: {
        type:String
    },
    weekday_full_day: {
        type:String
    },
    saturday: {
        type:String
    },
    scheme_type: {
        type:String
    },
    extended_operating_hours: {
        type:String
    },
    provision_of_transport: {
        type:String
    },
    government_subsidy: {
        type:String
    },
    gst_regisration: {
        type:String
    },
    last_updated: {
        type:String
    },
    remarks: {
        type:String
    },
    
},{timestamps: true});

const School = mongoose.model('School', schoolSchema);
module.exports = School