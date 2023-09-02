const express = require('express');
const aController = require('../controllers/answerController');
const {checkUser} =require('../middleWares/authMiddleWare');



const aRouter = express.Router();


aRouter.post('/answerQuestion/:id',checkUser ,aController.getAnswerFnc);


aRouter.get('/',checkUser ,aController.showAnswerHomePage);

aRouter.get('/delete-answer/:id', aController.delAnswer);

// aRouter.get('/show-question', aController.backAnswer);






// aRouter.all('/answerQuestion/:id' ,checkUser, aController.answerQuestionFunc);
// aRouter.all('/answerQuestion/:id',checkUser, aController.showQuestionFunc);

// aRouter.all('/qAndAnswer/:id',checkUser, aController.refeshPage);





module.exports = aRouter;