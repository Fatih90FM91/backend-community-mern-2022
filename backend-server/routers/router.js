 const express =require('express');
 const controller =require('../controllers/controller');
 const {checkUser} =require('../middleWares/authMiddleWare');
 const {checkSocial} =require('../middleWares/authSocialMiddleWare');

 const router =express.Router();

 const authCheck =(req,res,next) => {

    if(!req.user) {
        res.redirect('/login');
    }else {
        next();
    }
 }



 if (checkUser) {
    router.get('/',checkUser,controller.getHomeFnc);
 } else {
    router.get('/',checkSocial, authCheck,controller.getHomeFnc);
 }

 module.exports=router;

