const mongoose = require('mongoose');
const Schema =require('mongoose');
const Question =require('./questionModel');
const  User =require('./userModel');
const mySchema = mongoose.Schema;

const answerSchema = new mySchema({

         answer:{
            type:String,
            required:true,
         
            
            
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: User
        },
        question_id: {
            type: Schema.Types.ObjectId,
            ref: Question 
        }
        ,
     
        created_at:{
            type:Date,
            default:Date.now()
        }

})

const Answer= mongoose.model('answer', answerSchema);

module.exports = Answer;