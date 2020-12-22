const express = require('express');
const authController = require('../controller/authenticateGoogle');
const localController = require('../controller/authenticate');
const router=express.Router();
router.get('/',authController.authenticate_user,authController.home_get);
router.get('/google',authController.google_get);
router.get('/google/cb',authController.googleMw,authController.googleRedirect_get);
router.get('/login',authController.login_get);
router.post('/login',localController.login_post);
router.get('/register',authController.register_get);
router.post('/register',authController.register_post); 
router.get('/logout',authController.logout_get);

module.exports=router
