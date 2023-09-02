
const passport =require('passport/lib');
const GoogleStrategy = require('passport-google-oauth20/lib').Strategy;
const Social=require('../models/socialModel');

const session  = require('passport/lib');






const checkSocial = async (req,res,next) => {

    const sessionToken = req.cookies.session ;// we need to focus here because as a session token to be able to pull....
  
    console.log("first session token :" +sessionToken );
    
    if( sessionToken ){
    
        try {
            const authSocial = await passport.verify(socialToken);
            Social.findById(authSocial.id)
            .then(social =>{
                const {googleId} =social;
                res.locals.social ={googleId};
                next();
            })
            .catch(err => {
                res.locals.social = null;
                next();
            })
        } catch (error) {
            
            res.locals.social = null;
            next();
        }
      
    }else {
        res.locals.social = null;
        next();
    }
    
    
    }
    



    module.exports = {
        checkSocial,
        
    }