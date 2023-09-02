

const handleErrorsAnswer = (err) => {
    //  console.log(err.message  , err.code);
    
     let errors ={answer:''};
    //  let errorsLgn ={email:'' , password:''};
    
     //dublicate error
    
     if(err.message==='answer'){
         errors.answer='Please enter an answer!!';
    
         return errors;
     }
    
    
     //validation errors
     if(err.message.includes('answer validation failed')){
         Object.values(err.errors).forEach(({properties}) =>{
            
            errors[properties.path] =properties.message;
    
         })
     }
    
     return errors;
    
    }
    
    module.exports ={
        handleErrorsAnswer
    }