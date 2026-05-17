
const mongoose=require("mongoose");
let Schema=mongoose.Schema;
const reviewSchema=new Schema({
feedback:String,
rating:{
    type:Number,
min:1,
max:5
},
create_at:{
    type:Date,
    default:Date.now()
},
author:{
  type: mongoose.Schema.Types.ObjectId,
      ref:"User",
}
}) 
module.exports= mongoose.model("Review",reviewSchema);