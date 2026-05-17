// const { findById } = require("./models/review");
const Listings=require("./models/listing.js");
const Review=require("./models/review.js");
const {listingsSchema,reviewSchema}=require("./schema.js")
module.exports.isloggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to listings" );
        return res.redirect("/login");
    }
    next();
 }
 module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isowner=async(req,res,next)=>{//for listings edit ,create
    let{id}=req.params;
    const listing=await Listings.findById(id)
    if(!listing.owner.equals(res.locals.curruser._id)){
req.flash("error","you are not the owner of this listing");
return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isreviewauthor=async(req,res,next)=>{//for delete review
    let{id,reviewId}=req.params;
    const review=await Review.findById(reviewId)
    if(!review.author.equals(res.locals.curruser._id)){
req.flash("error","you are not the author of this review");
return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.listingvalidate=(req,res,next)=>{
    let {error}=listingsSchema.validate(req.body);
 if(error){
     console.log(error)
     let errMsg=error.details.map((el)=>el.message).join(",");
     throw new CustomError(400,errMsg);
 } 
 else{
     next();
 }
 }