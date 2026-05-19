const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const customError=require("../utils/customError.js")
const {listingsSchema,reviewSchema}=require("../schema.js")
const Listings=require("../models/listing.js");
const {isloggedin,isowner,listingvalidate}=require("../middleware.js")
const c_listings=require("../controller/c_listings.js")
const multer = require('multer')//
const {storage}=require("../cloudConfig.js")
const upload = multer({storage} )
if(process.env.NODE_ENV!="production"){//this condition is for secure your creadential information ,credential information like- secret information
    require('dotenv').config()
}
router.route("/")
.get(wrapAsync(c_listings.index))
.post(isloggedin,
  upload.single('listing[image]'),
 listingvalidate,
 wrapAsync (c_listings.savelisting));
//
router.get("/:name/Category",wrapAsync(c_listings.category)) ; 
//
router.get("/new",isloggedin,c_listings.createlisting);
router.get("/:id/edit",isloggedin,isowner,wrapAsync(c_listings.edit));

router.route("/:id")
.get(wrapAsync(c_listings.show))
.patch(isloggedin,
  isowner,
  upload.single('listing[image]'),
  listingvalidate,
  wrapAsync(c_listings.update))
.delete(isloggedin,isowner,wrapAsync(c_listings.destroy));
module.exports=router;