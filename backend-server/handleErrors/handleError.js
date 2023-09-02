const User = require('../models/userModel');


const handleErrors = (err) => {
//  console.log(err.message  , err.code);

 let errors ={username:'' , email:'' , password:''};
//  let errorsLgn ={email:'' , password:''};

 //dublicate error

 if(err.code===11000){
     errors.email='the email is already registered!!';

     return errors;
 }




 //validation errors
 if(err.message.includes('user validation failed')){
     Object.values(err.errors).forEach(({properties}) =>{
        
        errors[properties.path] =properties.message;

     })
 }

 return errors;

}

module.exports ={
    handleErrors 
}