const jwt = require('jsonwebtoken');
// const session =require('cookie-session');
const passport =require('passport/lib');

const User = require('../models/userModel');
const Social =require('../models/socialModel');
const session  = require('passport/lib');


const checkUser = async (req, res, next) => {
    const token = req.cookies.jwtToken;
   
   

    if(token){
        try {
            const authUser = await jwt.verify(token, 'this signature is optional');
            User.findById(authUser.id)
                .then( user => {
                    const { username, email, createdAt, updatedAt ,id} = user;
                    res.locals.user = { username, email, createdAt, updatedAt ,id};
                    next();
                })
                .catch(err => {
                    res.locals.user = null;
                    next();
                })
        }
        catch (error) {
            res.locals.user = null;
            next();
        }
    }  else {
          res.locals.user = null;
        next();
    }
}//



module.exports = {
    checkUser,
    
}
