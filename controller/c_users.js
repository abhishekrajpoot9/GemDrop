const User=require("../routes/user.js");
module.exports.signUp=(req,res)=>{
    res.render("users/signUp.ejs")
    };
module.exports.signUpredirect=async(req,res,next)=>{
  try{
    let{username,email,password}=req.body;
    const newUser=new User({username,email});
   const registereduser= await User.register(newUser,password);
   req.login(registereduser,(error)=>{
    if(error){
      return next(error);
    }
    req.flash("success","welcome to DropGem")
    res.redirect("/listings")
   })
 }
    catch(e){
    req.flash("error",e.message)
    res.redirect("/signUp")
   }
}
module.exports.login=(req,res)=>{
    res.render("users/login.ejs")
  };
  module.exports.loginredirect=async(req,res)=>{
    req.flash("success","welcome back on DropGem")
  res.redirect(res.locals.redirectUrl||"/listings")
  }
  module.exports.logout=(req,res,next)=>{
    req.logout((error)=>{
      if(error){
  return next(error);
      }
      req.flash("success","you are logged out");
      res.redirect("/listings")
    })
  }