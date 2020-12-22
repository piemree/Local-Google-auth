const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/googleUser');
require('dotenv').config()

passport.use(new GoogleStrategy({
callbackURL:'/auth/google/cb',
clientID:process.env.CLIENT_ID||'849227706372-vvsdu57gq766ou20e1hki8sqvii9rc03.apps.googleusercontent.com',
clientSecret:process.env.CLIENT_SECRET||'VH6Dh7fP7dC50J3PAb43kn9z',
//scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
},async(acsessToken,refleshToken,profile,done)=>{
    console.log(profile)
    const currentUser=await User.findOne({googleId:profile.id})
    if (currentUser) {
        console.log('current user',currentUser)
       return done(null,currentUser)
    }
     else{
        const newUser=await new User({
            username:profile.displayName,
            googleId:profile.id
        }).save()
        console.log('new user created',newUser)
       return done(null,newUser)
    }
   
}))

passport.serializeUser(function(user, done) {
    done(null, user.id||user.googleId);
  });
  
  passport.deserializeUser(async function(id, done) {
   const deUser=await User.findById(id);
   done(null, deUser);
  });