const form =document.getElementById('formlogin');

const emailErr =document.querySelector('.email.error');
const passwordErr =document.querySelector('.password.error');


// usernameErr.textContent='hello guysss!!';
 
// dataInfo.textContent='infoooo';
form.addEventListener('submit' , async (e) => {
    
    e.preventDefault();
 
   
    //reset credentials
           
            emailErr.textContent='';
            passwordErr.textContent='';

    //get the values
  
    const email =form.email.value;
    const password=form.password.value;



    try {
     
        const res = await fetch('/login' ,{
            method :'POST',
            body: JSON.stringify({email,password}),
            headers:{'Content-Type' : 'application/json'}

        });

        const data = await res.json();
       

        console.log(data);
     
        if(data.errors){

            emailErr.textContent=data.errors.email;
            console.log(data.errors.email);
            passwordErr.textContent=data.errors.password;
        }

   if(data.user){
       location.assign('/');
   }

        
    } catch (err) {
        console.log(err);
       
    }
});
