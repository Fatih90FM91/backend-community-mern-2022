const Answer =require('../models/answerModel');
const Question =require('../models/questionModel');



let questionId='';


const getAnswerFnc =(req,res) =>{

    const { answer } = req.body;
    const question_id = req.params.id;
    // questionId=question_id;
    console.log("question id===>>"+question_id);
    // const {id} = res.locals.user;
    // console.log(id);
    const newAnswer = new Answer({ answer , question_id }); //, user_id: id, question_id 
    newAnswer.save()
        .then( () => {
            // console.log(newAnswer);
            res.status(200).send(newAnswer);
            // res.redirect(`/show-question/${req.params.id}`)
        })
        .catch(err => console.log( err))
}




const showAnswerHomePage =(req,res) => {

  
        Answer.findById(req.params.id).populate('user_id', ['username'])
            .then( answers => {
                // res.redirect('/homePage', {pageTitle: 'Show Home Question', answers})
                
                res.status(200).send(answers);
            })
            .catch(err => console.log(err))
   

}


const delAnswer = async (req,res) =>{
  

    try {
        const userQuestion = await  Question.findOne()
       
        console.log(userQuestion);
   

        Answer.findByIdAndDelete(req.params.id)
        .then( () => {
            // console.log(req.params.id);
            const id = questionId;
           res.redirect(`/show-question/${id}`)
        })
        .catch(err=>{
            console.log(err)
        })

    } catch (err) {
        console.log(err)
    }
 
}

const backAnswer = (req,res) => {
  
    try {
        const backID = questionId;
    

      
            res.redirect(`/show-question`)
      
    } catch (err) {
        console.log(err);
    }
}



module.exports = {

    getAnswerFnc,
    showAnswerHomePage,
    delAnswer,
    backAnswer
 
}