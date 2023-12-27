const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        required:true
        
    },
    name: {
        type: String,
        required:true
        
    },
    email: {
        type: String,
        required:true
        
    },
    mobileno: {
        type: Number,
        required:true
        
    },
    dob: {
        type: String,
        required:true
        
    }
}, {
    collection:"Users"
})

module.exports = mongoose.model("User", userSchema);