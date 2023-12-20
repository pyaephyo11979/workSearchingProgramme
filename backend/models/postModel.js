const mongoose = require('mongoose');
const jobPostSchema =  mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    requirements: {
        type: String,
        required: true,
        trim: true
    },
    postedBy: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name:{
            type: String,
            required: true,
            ref: 'User'
        }
    },
    applicants: [{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name:{
            type: String,
            ref: 'User'
        },
    }],
    status:{
        type: String,
        default: 'open'
    }
},{timestamps:true});
module.exports=mongoose.model('Post',jobPostSchema)