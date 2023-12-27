const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDB = async () => {

    try {

        await mongoose.connect(process.env.Conn_String);

        console.log("Database Connected Successfully")
        
    } catch (error) {

        console.log("Error in Connecting Database");
        
    }
}

module.exports = connectDB;