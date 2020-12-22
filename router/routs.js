const express = require('express');
const authController = require('../controller/authenticate');
const router=express.Router();

router.get('/',authController.authenticate_user,authController.home_get);
router.get('/login',authController.deAuthenticate_user,authController.login_get);
router.post('/login',authController.login_post);
router.get('/register',authController.deAuthenticate_user,authController.register_get);
router.post('/register',authController.register_post); 
router.get('/logout',authController.logout_get);

router.get('/google',authController.google_get);
router.get('/google/cb',authController.googleMw,authController.googleRedirect_get);

module.exports=router