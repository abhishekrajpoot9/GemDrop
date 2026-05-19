const joi= require('joi');
module.exports.listingsSchema=joi.object({
  listing:joi.object({
    title:joi.string().required(),
    category: joi.string()
            .valid(
                "Mountains",
                "Rooms",
                "Castles",
                "Pools",
                "Camping",
                "Farms",
          
                "Arctic",
                "River"
            )
            .required(),
  description:joi.string().required(),
    image:joi.string().allow("",null),
   price:joi.number().required().min(0),
country:joi.string().required(),
location:joi.string().required(),
  }).required(),
})
 //this is for reviws 
 module.exports.reviewSchema=joi.object({
  review:joi.object({
rating:joi.number().required().min(1).max(5),
feedback:joi.string().required(),
  }).required()
 })