
const passport =require('passport/lib');
const GoogleStrategy = require('passport-google-oauth20/lib').Strategy;
// const User =require('./models/userModel');
const User2=require('../models/socialModel');
// const User = require('../models/userModel');





// passport.use(Social.createStrategy());


// use static serialize and deserialize of model for passport session support
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User2.findById(id).then(user => {
      // console.log('it is coming from deserielize!'+user);
      done(null , user);
    })
    
  
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/ingbank",
      // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    (accessToken, refreshToken, profile, done) =>{
      // console.log(profile);

      User2.findOne({googleId:profile.id}).then((currentUser) =>{

        if(currentUser){
          //  console.log("current social" + currentUser);

           done(null,currentUser);

        }else {
          new User2({
            username:profile.displayName,
            googleId:profile.id
          }).save().then((newUser) =>{
            // console.log('new social created:' + newUser);
            done(null,newUser);
          });

        }
       
      })

   
      // Social.findOrCreate({ googleId: profile.id }, function (err, social) {
      //   return done(err, social);
      // });
    }
  ));

