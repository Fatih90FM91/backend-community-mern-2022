const mongoose =require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;


const userSchema =new Schema({

    username:{
        type:String
    },


    googleId:{
    type:String
    }
    
    
},{timestamps: true})




// socialSchema.plugin(passportLocalMongoose);
// socialSchema.plugin(findOrCreate);


const User2 = mongoose.model('user2', userSchema);
module.exports = User2;