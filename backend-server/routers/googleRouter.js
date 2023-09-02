
const express = require('express');
const passport =require('passport/lib');
const User =require('../models/userModel');





const gRouter =express.Router();



// gRouter.use(passport.initialize());




  gRouter.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

 gRouter.get("/auth/google/ingbank",passport.authenticate('google'),(req,res) => {

// res.send(req.user);



    res.redirect('/');

  });
//   function(req, res) {
    // Successful authentication, redirect to homePage.
    // res.redirect("/");
 
//   });


//   gRouter.post("/login", function(req, res) {
//     const user = new User ({
//       email:req.body.email,
//       password:req.body.password
//     });
//     req.login(user, function(err){
//       if(err){
//         console.log(err);
    
//       }else{
//         passport.authenticate("local")(req,res,function(){
//           res.redirect("/");
//         })
//       }
//     });
    
    
//     });

    // gRouter.get("/logout" ,function(req , res){
    //     req.logout();
    //     res.redirect("/login");
    //   })

    

  module.exports = gRouter;