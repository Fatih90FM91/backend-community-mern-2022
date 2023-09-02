const express =require('express');
const uController =require('../controllers/userController');
const {checkUser} =require('../middleWares/authMiddleWare');
const {handleErrors } =require('../handleErrors/handleError');


const userRouter =express.Router();

userRouter.all('/signup' ,uController.signUp);
userRouter.all('/login' ,uController.login);
userRouter.get('/logout' ,uController.logout);
userRouter.get('/all-users', uController.allUsers)


module.exports= userRouter;