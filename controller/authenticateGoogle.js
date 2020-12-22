const passport = require('passport');
const bcrypt = require('bcrypt');
const userModel = require('../model/user');
module.exports.home_get= (req, res) => {
    const user=req.user
   res.render('home',{user:user})
}

module.exports.register_get= (req, res) => {
    const user=req.user
    res.render('register',{user:user})
}
module.exports.register_post=(req, res) => {
    const {username,password}=req.body;
    
   const hashPassword=bcrypt.hash(password,10,(err,res) => {
       
       const user=new userModel({
        username:username,
        password:res
    })
    user.save()
   })

    res.status(200).redirect('/login')
}
module.exports.login_get=(req, res) => {
    const user=req.user
    res.render('login',{user:user})
}
module.exports.login_post=/*passport.authenticate('local',{failureRedirect:'/auth/login',successRedirect:'/'})*/
(req,res) => {
    res.send('log post')
}

module.exports.logout_get= (req, res) => {
    req.logOut();
    req.session.destroy()
    res.redirect('/auth/login')
}
module.exports.google_get=passport.authenticate('google',{scope:['profile']})

module.exports.googleMw=passport.authenticate('google',{failureRedirect:'/auth/login'})
module.exports.googleRedirect_get=(req,res) => {
     res.redirect('/auth');
}
module.exports.authenticate_user=(req,res,next) => {
    if (req.user) {    
       next()
    }else{
        res.redirect('/auth/login')
    }
}
module.exports.deAuthenticate_user=(req,res,next) => {
    if (!req.session.passport) {
        next()
    }else{
        res.redirect('/')
    }
}


