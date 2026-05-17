const express=require("express");
const router=express.Router();
const User=require("../routes/user.js");

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { error } = require("console");
const c_users=require("../controller/c_users.js")

const {saveRedirectUrl}=require("../middleware.js");
router.route("/signUp")
.get(c_users.signUp)
.post(wrapAsync(c_users.signUpredirect ));

router.route("/login")
.get(c_users.login)
.post(  saveRedirectUrl,
  passport.authenticate("local",{failureRedirect:"/login",failureFlash:true})
,c_users.loginredirect)

router.get("/logout",c_users.logout)
module.exports=router;