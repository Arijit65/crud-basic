const express=require("express");

const mongoose=require("mongoose");
const User=require("../models/userModel");

const router=express.Router();







//create
// router.post("/addUser",async(req,res)=>{
//     const {name,email,age}=req.body;
//     try {
//         const userAdded=await User.create({
//             name:name,
//             email:email,
//             age:age,
//         });
//         res.status(201).json(userAdded);
//         return; 
        
//     } catch (error) {
//         console.log(error);
//         res.send(400).json({error:error.message})
        
//     }
  
// })
router.post("/addUser", async (req, res) => {
    const { name, email, age } = req.body;
    try {
      const userAdded = await User.create({
        name: name,
        email: email,
        age: age,
      });
      res.status(201).json(userAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });




//get
router.get("/",async (req,res)=>{
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
        return; 
    } catch (error) {
        console.log(error);
        res.send(500).json({error:error.massage})
    }
   
   /// res.send("api is running");
});


//get single user
router.get("/:id",async (req,res)=>{
    const {id} = req.params;
    try {
        const singleUser = await User.findById({_id: id});
        res.status(200).json(singleUser);
        return; 
    } catch (error) {
        console.log(error);
        res.send(500).json({error:error.massage})
    }
   
   /// res.send("api is running");
});

//delete

router.delete("/:id",async (req,res)=>{
    const {id} = req.params;
    try {
        const singleUser = await User.findByIdAndDelete({_id: id});
        res.status(200).json(singleUser);
        return; 
    } catch (error) {
        console.log(error);
        res.send(500).json({error:error.massage})
    }
   
   /// res.send("api is running");
});

//put/patch
router.patch("/:id",async (req,res)=>{
    const { id } = req.params;
    const {name,email,age}=req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{

            new:true,

        });
        res.status(200).json(updateUser);
        return; 
    } catch (error) {
        console.log(error);
        res.send(500).json({error:error.massage})
    }
   
   /// res.send("api is running");
});





module.exports=router;