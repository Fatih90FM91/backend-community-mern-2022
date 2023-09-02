
const handleLoginErrors = (err) => {
    //  console.log(err.message  , err.code);
    
    
     let errors ={email:'' , password:''};
    
     //dublicate error
    
     if(err.code===11000){
         errors.email='the email is already registered!!';
    
         return errors;
     }
    
     //login
    
     if(err.message ==='Incorrect Email!!'){
        errors.email='the email is not registered!!';
    
     }
    
     if(err.message ==='Incorrect password!!'){
        errors.password='Incorrect password!!';
    
     }

     if(err.message ==='Email is empty!!'){
        errors.email='the email is empty!!';
    
     }

     if(err.message ==='Password is empty!!'){
        errors.password='the password is empty!!';
    
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
        handleLoginErrors 
    }