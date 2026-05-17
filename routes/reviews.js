const express=require("express");
const router=express.Router({mergeParams:true});
const {isloggedin,isowner,listingvalidate,isreviewauthor}=require("../middleware.js")
const wrapAsync=require("../utils/wrapAsync.js")
const customError=require("../utils/customError.js")
const Listings=require("../models/listing.js");
const Review=require("../models/review.js");
const {listingsSchema,reviewSchema}=require("../schema.js");
const { createreview } = require("../controller/c_reviews.js");
const c_reviews=require("../controller/c_reviews.js")
const reviewvalidate=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
 if(error){
     console.log(error)
     let errMsg=error.details.map((el)=>el.message).join(",");
     throw new customError(400,errMsg);
 } 
 else{
     next();
 }
 }

 router.use((err,req,res,next)=>{
     let{statusCode=500,message="something went wrong!"}=err;
     res.status(statusCode).render("listings/error.ejs",{message});
 });
 router.post("/",isloggedin,reviewvalidate,wrapAsync(c_reviews.review))
 router.delete("/:reviewId",isloggedin,isreviewauthor,wrapAsync(c_reviews.destroy))
 module.exports=router;