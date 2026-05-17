const express=require("express");
const app=express();
const  cookieParser = require('cookie-parser');
const session = require('express-session');
const { name } = require("ejs");
const flash = require('connect-flash');
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(cookieParser())
app.use(flash());
app.use(session({secret:"abhi12344321",resave:false,saveUninitialized:true}));
app.listen(3000,()=>{
    console.log("port is listing on port 3000")
})

app.get("/session",(req,res)=>{
    let{name="anonymous"}=req.query;
    req.session.name=name;
   req.flash("success","user register successful");
    res.redirect("/register");   
})
app.get("/register",(req,res)=>{
    res.render("page.ejs",{name:req.session.name,msg:req.flash("success")})
})