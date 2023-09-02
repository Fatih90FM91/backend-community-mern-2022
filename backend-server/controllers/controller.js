const Question =require('../models/questionModel');
const Answer =require('../models/answerModel');

const getHomeFnc =(req,res) =>{
// res.render('homePage' ,{pageTitle:'home page'});
// Question.findById(req.params.id).populate('user_id', ['username'])
// .then( result => {
    Answer.find().populate('user_id', ['username'])
        .then( answers => {
            // res.render('homePage', {pageTitle: 'Show Question' ,answers })
            res.status(200).send(answers)
        })
        .catch(err => console.log(err))
}
// .catch(err => console.log(err))
// }

module.exports= {

    getHomeFnc
}