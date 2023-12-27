const express = require("express");
const router = express.Router();
const { checkUser,insertUser } = require("../Controller/crud")
const userDB = require("../Model/user");

//API ENDPOINT FOR CREATING USERS

router.post("/create", async (req, res) => {

    // console.log(req.body);

    const { rollno,name, email, password, mobileno,dob } = req.body;

    // console.log(email);

    const userValid = await checkUser(email);

    if (userValid == true) {
        res.status(200).json({
            success: false,
            message:"User Already Exist"
        })
    } else if (userValid == false) {

    const userSaved = await insertUser(rollno, name, email, password, mobileno,dob);
    
    if (userSaved == "Error in Saving User") {
        
        res.status(400).json({
            success:false,
            message:"Error in Saving User"
        })
    } else if (userSaved == "Server Busy") {
        res.status(500).json({
            success: false,
            message:"Server Busy"
        })
    } else {
        res.status(200).json({
            success: true,
            message: "User Saved Successfully",
            userData:userSaved
        })
    }

    } else if (userValid == "Server Busy") {
        res.status(500).json({
            success: false,
            message:"Server Busy"
        })
    }

})


//API ENDPOINT FOR UPDATING USER DATA IN DB

router.put("/update/:id", async (req, res) => {
    
  
    
    const userID = req.params.id;

    const updateData = req.body;

    // console.log("id",userID);
    // console.log("updateData", updateData);

    try {

        const updatedData = await userDB.findByIdAndUpdate(userID, updateData, { new: true });
        
        // console.log("updatedData",updatedData);

        if (updatedData) {
            res.status(200).json({
                success:true,
                message: "User Updated Successfully!!!",
                userData:updatedData
            })
        } else {
            res.status(400).json({
                success:false,
                message:"User Id Not Matched for the exist user"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Server busy",
             error:error
        })
    }
})


//API ENDPOINT FOR DELETE USER FROM MONGODB


router.delete("/delete/:id", async (req, res) => {
    
    const userID = req.params.id;

    // console.log("userID", userID);

    try {
        
        const deletedUser = await userDB.deleteOne({ _id: userID });

        if (deletedUser) {
            // console.log("deletedUser",deletedUser)

            res.status(200).json({
                success:true,
                message: "User Deleted Successfully!"
                
            })
        } else {
            res.status(400).json({
                success: false,
                message:"Can't able to delete user"
            })
        }
    }catch(error){
        console.log("error", error);
        
        res.status(500).json({
            success: false,
            message: "Error in deleting User",
            error:error
        })
    }
})


//API ENDPOINT FOR SELECTING USER DATA

router.get("/select", async (req, res) => {
  try{
    const userList = await userDB.find({})

    // console.log("userList", userList);
    if (userList) {
        res.status(200).json({
            success:true,
            message:"User List Fetched Successfully",
            userList:userList
        })
    }else {
        res.status(400).json({
            success:false,
            message: "Can't able to fetch data"

        })
    }
  } catch (error) {
      console.log("error",error)
      res.status(500).json({
        success:false,
          message: "Server Busy"
        
      })
  }
  
})

module.exports = router;