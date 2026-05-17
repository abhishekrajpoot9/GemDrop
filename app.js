const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listings=require("./models/listing.js");
const Review=require("./models/review.js");
const path=require("path");
const ejsmate = require("ejs-mate")
const wrapAsync=require("./utils/wrapAsync.js")
const customError=require("./utils/customError.js")
const {listingsSchema,reviewSchema}=require("./schema.js")
const listingrouter=require("./routes/listings.js")
const reviewrouter=require("./routes/reviews.js")
const user1router=require("./routes/user1.js")
const  cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride=require("method-override");
const User=require("./routes/user.js")
const LocalStrategy=require("passport-local");
const passport=require("passport");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('ejs',ejsmate);
app.use(cookieParser())
app.use(flash());
const sessionOptions={
    secret:"abhi123321",
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
}
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user;
    next()
})
app.listen(8080,()=>{
    console.log("port is listing on port 8080")
})
  async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    }
    main()
    .then((res)=>{
        console.log ("connected")
    });
    app.get("/",(req,res)=>{
res.send("success")
})

app.use("/listings",listingrouter);
app.use("/listings/:id/review",reviewrouter);
app.use("/",user1router);

