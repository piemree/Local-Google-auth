const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
//require('./authentication/passport-google');
require('./authentication/local');
const router=require('./router/routs')
//const routerAuth=require('./router/googleRouth')
const app = express()
const port = 3000

//DB CONNECTİON AND START SERVER
const key='mongodb+srv://mydb:mydb@herokudb.mpls7.mongodb.net/herokuDb?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGO_KEY||key,{useNewUrlParser: true, useUnifiedTopology: true})
.then(result=>{
    console.log('Db connection success')  
    app.listen(process.env.PORT||port, () => console.log(`Listening adress:http://127.0.0.1:3000`))
}).catch(err=>{
    console.log('DATABASE E BAĞLANAMADI',process.env.MONGO_KEY)
})


app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(session({
    secret:'123456789',
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection,dbName:'sessions'}),
    cookie:{maxAge:1000*60*60*24}
   
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/',router);
app.get('/google9b6267f48ae7b830.html', (req, res) =>{res.send('google-site-verification: google9b6267f48ae7b830.html')});
//app.use('/auth',routerAuth);


