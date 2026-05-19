const mongoose=require("mongoose");
const { listingsSchema } = require("../schema");
const Review=require("./review.js");
const { type } = require("os");
const { string, required } = require("joi");

let Schema=mongoose.Schema;
const listeningSchema=new Schema({
title:{
    type:String,
    required:true,
},
description:String,
image: {
    url:String,
filename:String,
    },
price:Number,
location:String,
country:String,
reviews:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Review",
},],
owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
},
latitude: Number,
longitude: Number,
category:{
    type:String,
    enum:["Mountains","Rooms","Castles","Pools","Camping","Farms","Arctic","River"],
    required:true,
},
})

listeningSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})
const Listings=mongoose.model("Listings",listeningSchema);
module.exports=Listings;