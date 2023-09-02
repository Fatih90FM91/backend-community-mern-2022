const express = require('express');
const qController = require('../controllers/questionController');
const {checkUser} =require('../middleWares/authMiddleWare');

const qRouter = express.Router();

qRouter.get('/askQuestion',checkUser, qController.addQuestionFunc );

qRouter.all('/askQuestion',checkUser, qController.questions);
qRouter.get('/showQuestion',checkUser, qController.showQuestion);

qRouter.get('/show-question/:id',checkUser, qController.getNewPageQuestionFnc );



qRouter.all('/edit-question/:id',checkUser, qController.updateQuestion);

qRouter.get('/delete-question/:id', qController.delQuestion);


module.exports = qRouter;