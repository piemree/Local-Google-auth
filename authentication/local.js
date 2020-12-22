const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user');
const UserGoogle = require('../model/googleUser');
require('dotenv')
passport.use(new localStrategy(
    {
        usernameField: 'username',
        passwordField:'password'
      },
    (username,password,done)=>{
    User.findOne({username},(err,res)=>{
        if(err) return done(err,false);
        if (!res) {
            console.log('kullancı bulunamadı')
            return done(null,false);
        }
        if (res) {
                console.log('kullancı bulundu',password,res.password)
            bcrypt.compare(password,res.password,(err,isUser) => {
                console.log('kullanıcı mı:',isUser)
                if(err)return done(err,false)
                if (!isUser) {
                    console.log('şifre yanlış')
                    return done(null,false)
                }else{
                    console.log('şifre doğru')
                    
                    return done(null,res)
                }
               
                
            })
        }
    })
}))

passport.use(new GoogleStrategy({
    callbackURL:'https://pi-emre.herokuapp.com/google/cb',
    clientID:process.env.CLIENT_ID||'490230848121-lun51sinsrhsthdmloo8mati6rmaian8.apps.googleusercontent.com',
    clientSecret:process.env.CLIENT_SECRET||'6SO5IZ7PbbNKOO7fXE54B32i'
    //scope: 'https://www.google.com/m8/feeds https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    },async(acsessToken,refleshToken,profile,done)=>{
        console.log(profile)
        const currentUser=await UserGoogle.findOne({googleId:profile.id})
        if (currentUser) {
            
           return done(null,currentUser)
        }
         else{
            const newUser=await new UserGoogle({
                username:profile.displayName,
                googleId:profile.id
            }).save()
           
           return done(null,newUser)
        }
       
    }))


  passport.serializeUser(function(user, done) {
   
    done(null, user.id||user.googleId);
  });
  
  passport.deserializeUser(async function(id, done) {
   const googleUser=await UserGoogle.findById(id);
   const localUser=await User.findById(id);
   done(null, googleUser||localUser);
  });

