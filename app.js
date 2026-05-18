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
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const methodOverride=require("method-override");
const User=require("./routes/user.js")
const LocalStrategy=require("passport-local");
const passport=require("passport");
const { url } = require("inspector");
const { env } = require("process");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
app.engine('ejs',ejsmate);
app.use(cookieParser())

const dbUrl=process.env.ATLASDB_URL;
const store =  MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
         secret:process.env.SECRET
    },
    touchAfter:24*3600,
});
store.on("error",(err)=>{
    console.log("error occuring in session store",err)
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        expires: new Date(Date.now() + 7*24*60*60*1000),
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
}
app.use(session(sessionOptions));
app.use(flash());
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
    await mongoose.connect(dbUrl);
    }
    main()
    .then((res)=>{
        console.log ("connected")
    });
    app.get("/",(req,res)=>{
res.redirect("/listings")
})

app.use("/listings",listingrouter);
app.use("/listings/:id/review",reviewrouter);
app.use("/",user1router);

