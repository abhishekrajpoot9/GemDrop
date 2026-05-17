const Listings=require("../models/listing.js");
const Review=require("../models/review.js");
module.exports.review=async(req,res)=>{  
    const reviewlisting= await Listings.findById(req.params.id);
    const Reviewbody=new Review(req.body.review);
    Reviewbody.author=req.user._id;
    
    reviewlisting.reviews.push(Reviewbody)
    await Reviewbody.save();
    await reviewlisting.save();
    console.log("revied saved")
    req.flash("success","new review created!");
    res.redirect(`/listings/${reviewlisting.id}`)
};
module.exports.destroy=async(req,res)=>{
     let {id,reviewId}=req.params;
     await Listings.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
     await Listings.findByIdAndDelete(reviewId);
     req.flash("success","review deleted!");
     res.redirect(`/listings/${id}`)
}