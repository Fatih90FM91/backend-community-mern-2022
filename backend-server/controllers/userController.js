const User =require('../models/userModel');
const jwt =require('jsonwebtoken');
const {handleErrors } =require('../handleErrors/handleError');
const {handleLoginErrors } =require('../handleErrors/handleLoginErr');
const findOrCreate = require('mongoose-findorcreate');
const gRouter =require('../routers/googleRouter');


// jwt
const maxAge = 3 * 24 * 60 * 60;
const createJwtToken = (id) => jwt.sign({id}, 'this signature is optional', {expiresIn: maxAge})
//jwt

// const handleErrors = (err) => {
//     console.log(err.message,err.code);
   
//    }

//---------------google-account-------------




const signUp = async (req,res) => {

 

    if (req.method === 'GET') {

        res.render('signup' ,{pageTitle:'Sign Up'});
        
    }

   
// --------------------Normal-post----------------------------------------
    if (req.method === 'POST') {
        const {username ,email ,password } =req.body;

     
        

        try {

            const user = await User.create({username ,email ,password});
            // console.log(user);

            const token =createJwtToken(user._id);
            // console.log(token);

            res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000});
           
            res.status(201).json({user:user._id});
           
          
            
        } catch (err) {
          const errors =  handleErrors(err)
          res.status(400).json({errors});
         
        
          console.log(errors);
          
            
        }

    }
    // --------------------Normal-post----------------------------------------




}



const login = async (req,res) => {

    if (req.method ==='GET') {
        

        res.render('login' ,{pageTitle:'login'});
    }

//     const { googleId} =req.body

// const googleAcnt = User.findOne({googleId: profile.id});
     

//     if(!googleAcnt){
   
    if (req.method ==='POST') {

        const {email ,password} =req.body;
      
        // User.logIn(email,password)
        // .then(user => {
        //     const token =createJwtToken(user.id);
        //     res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000});
           
        // })
        // .catch(err =>      )


        try {
            const user = await User.logIn(email,password);
            const token =createJwtToken(user._id);
            // console.log(token);

            res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000});
            res.status(200).send({user,token});
            // json({user:user._id})

        } catch (err) {
            const errors =  handleLoginErrors(err)
            res.status(400).json({errors});
        }
       
    }

}


const allUsers = async (req, res) => {
    await User.find()
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    res.status(400).send("unable to find users");
                });
};




const logout = (req,res) => {

    res.clearCookie('jwtToken');
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.redirect('/login');
}


module.exports ={

    signUp,
    login,
    logout,
    allUsers
    
}