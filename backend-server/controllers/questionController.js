const Question =require('../models/questionModel');
const Answer =require('../models/answerModel');
const {handleErrorsAnswer} =require('../handleErrors/handleErrAnswer');


const addQuestionFunc = (req, res) => {
    res.render('questions/askQuestion', {pageTitle: 'Ask Question' , user:req.user});
}



const showQuestion =(req,res) =>{
 

    Question.find().populate('user_id', ['username'])
    .then(questions =>{
       
        // res.render('questions/showQuestion', {pageTitle: 'Home', questions  , user:req.user} );
        res.send(questions);
    })
    .catch(err=>{
        console.log(err)
    })
    
   
   }
   

const questions = (req,res) =>{

    if (req.method=='GET') {

        // res.render('questions/askQuestion' , {pageTitle:'Post question'})
    }

    if (req.method=='POST') {

        const {question,description} =req.body;
        // const {id} = res.locals.user; ,user_id:id
     
        const newQuestion = new Question({question,description});
          newQuestion.save()
           .then(() =>{
           
            // res.status(200).send(newQuestion);
            res.redirect('/showQuestion');

        })
        .catch(err=>{
            console.log(err)
        })
        
       
      
       
    }

}

const getNewPageQuestionFnc =(req,res) => {

   
    Question.findById(req.params.id).populate('user_id', ['username'])
    .then( result => {
        Answer.find({ question_id: {$in :[ result.id ]}}).populate('user_id', ['username'])
            .then( answers => {
                // res.render('questions/newPageQuestion', {pageTitle: 'Show Question', question: result, answers})
                res.send( [{question: result,answers}]);
            })
            .catch(err =>  console.log(err) )
    })
    .catch(err => console.log(err))
}

//---------------------------------------------------------------------------------------------------------
const delQuestion =(req,res) =>{
Question.findByIdAndDelete(req.params.id)
.then( ()=> {
 res.redirect('/showQuestion');

})
.catch(err=>{
    console.log(err)
})
}


const updateQuestion =(req,res) =>{

    if (req.method==='GET') {
        Question.findById(req.params.id)
        .then(question=> {
            res.render('questions/editQuestion' ,{pageTitle:'edit Question' ,question})
        })
        .catch(err => console.log(err))
    }

    
    if (req.method==='POST') {
        Question.findByIdAndUpdate(req.params.id,req.body)
        .then(result=>{
              res.redirect('/showQuestion')
        })
        .catch(err =>console.log(err))
        
    }
}

module.exports = {
    addQuestionFunc,
    questions,
    showQuestion,
    delQuestion,
    updateQuestion,
    getNewPageQuestionFnc
}