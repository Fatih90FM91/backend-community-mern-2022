const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} =require('validator');


const Schema = mongoose.Schema;


const userSchema =new Schema({

  
    username:{
        type:String,
        required:[ true , 'please enter your username!!']
    },

    email:{
        type:String,
        required:[true, 'please enter your email!'],
        lowercase: true,
        unique:true,
        validate: [ isEmail , 'please enter valid email!!']
    },

    password:{
        type:String,
        required:[true , 'please enter your password!']
    },

     
    
},{timestamps: true})


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); //on this section we did bcrypt to our password before saving.


userSchema.statics.logIn = async function (email ,password) {

    if(email =='') throw new Error('Email is empty!!');
    if(password =='') throw new Error('Password is empty!!');

    try {
        const user = await this.findOne({email});

        const auth =await bcrypt.compare(password , user.password)
        if(auth) return user;
        throw new Error('Incorrect password!!')
    } catch (error) {

        throw new Error('Incorrect Email!!');
        
    }
}





const User = mongoose.model('user', userSchema);
module.exports = User;