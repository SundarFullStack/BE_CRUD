const UserDB = require("../Model/user");


const insertUser = async (rollno,name, email,password, mobileno,dob) => {
    
    try {
        const newUser =new UserDB ({
            rollno: rollno,
            name: name,
            email: email,
            password:password,
            mobileno:mobileno,
            dob:dob
        })
    
        const userSaved = await newUser.save();
    
        // console.log(userSaved);
    
        if (userSaved) {
            return userSaved
        }
        else {
            return "Error in Saving User"
        }
        
      
    } catch (error) {
        return "Server Busy"
        
  }
}
const checkUser = async (email) => {

    try {
        const userValid = await UserDB.findOne({ email: email });
    
        if (userValid) {
            return true
        }
        else {
            return false
        }
     
    } catch (error) {
        return "Server Busy"
        
 }


    
}

module.exports = {checkUser,insertUser};