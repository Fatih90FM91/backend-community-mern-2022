require("dotenv").config({ path: "./config.env" });//config.env
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path =require('path');
const bodyParser = require('body-parser');
const router = require('./backend-server/routers/router');
const userRouter =require('./backend-server/routers/userRouter')
const questionRouter =require('./backend-server/routers/questionRouter');
const answerRouter =require('./backend-server/routers/answerRouter');
const googleRouter =require('./backend-server/routers/googleRouter')
const User2=require('./backend-server/models/socialModel');
const connectDB = require("./backend-server/config/mongoose");

const cookieSession =require('cookie-session');
const session =require('express-session');
const passport =require('passport/lib');
// const passportLocalMongoose = require('passport-local-mongoose');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');
// const User =require('./models/userModel');

require('./backend-server/config/mongoose');

// require('./backend-server/config/passport-setup');

connectDB();

const app =express();
const PORT= process.env.PORT || 5000;

// app.use(session({
//     secret:"our little secret",
//     resave:false,
//     saveUninitialized:false
//   }));

  app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.KEY],
  }));


  app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET","HEAD","PUT","POST","DELETE"],
    preflightContinue: false,
    optionsSursccessStatus: 204,
    credentials:true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.set('view engine', 'ejs');





app.use(router,userRouter,questionRouter, answerRouter,googleRouter);

// Step 1:
app.use(express.static(path.resolve(__dirname, "./frontend-web/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./frontend-web/build", "index.html"));
});

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname,'/frontend-web/build')));
// //frontend-web//frontend-web
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend-web', 'build', 'index.html'));
//   });
// }else{
//   app.get('/',(req,res) =>{
//     res.send('Api Running');
//   })
// }

// const __dirname1 = path.resolve();
//my bug is starting in this poin----------------------------------------------------
// if (process.env.NODE_ENV == "production") {
//   console.log("i am here guys");
  // app.use(express.static(path.join(__dirname1, "/frontend-web/build")));
//   app.use(express.static(path.join("/frontend-web/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "frontend-web", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     console.log("oooo yessss ");
//     res.send("API is running..");
//   });
// }


app.listen(PORT, console.log(`The server is listening now on port ${PORT}!!`));