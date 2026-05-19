const Listings=require("../models/listing.js");
const {data}=require("../init/data.js")
module.exports.index=async(req,res)=>{
    const allListings=await Listings.find({});
    res.render("listings/index.ejs",{ allListings })
}
module.exports.createlisting=(req,res)=>{
    res.render("listings/new.ejs")
} 

module.exports.show=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listings.findById(id)
    .populate({
        path:"reviews",
      populate:{
        path:"author",
      },
    })
    .populate("owner");
    if(!listing){
        req.flash("error"," listing you requested for does not exit!");
        res.redirect("/listings");  
    }
    console.log(listing.owner)
     res.render("listings/show.ejs",{listing}) 
};

module.exports.savelisting = async (req, res) => {

  try {

      

      const address = req.body.listing.location;

      // geocoding api
      const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
          {
              headers: {
                  'User-Agent': 'my-app'
              }
          }
      );

      const data = await response.json();

      let latitude = null;
      let longitude = null;

      if (data.length > 0) {
          latitude = data[0].lat;
          longitude = data[0].lon;
      }

     
      const url = req.file.path;
      const filename = req.file.filename;

    
      const newListings = new Listings(req.body.listing);

      
      newListings.latitude = latitude;
      newListings.longitude = longitude;

      newListings.owner = req.user._id;

      newListings.image = { url, filename };

      await newListings.save();

      req.flash("success", "new listing created!");

      res.redirect("/listings");

  } catch (err) {

      console.log(err);

      req.flash("error", "Something went wrong");

      res.redirect("/listings");

  }
};
module.exports.category=async(req,res)=>{
let {name}=req.params;
const category=await Listings.find({category:name})
res.render("listings/category.ejs",{category})
//////
//////
}
    module.exports.edit=async(req,res)=>{
        let {id}=req.params;
        const listing=await Listings.findById(id)
        if(!listing){
    
            req.flash("error"," listing you requested for does not exit!");
            res.redirect("/listings");  
        }
        const originalimage=listing.image.url;
        const originalimageurl=originalimage.replace("/upload","/upload/e_blur:200")
        
        res.render("edit.ejs",{listing,originalimageurl})
    }; 

    module.exports.update=async(req,res)=>{
            let {id}=req.params;
        const updatelistings=await Listings.findByIdAndUpdate(id,{...req.body.listing});
        if(typeof req.file !=="undefined"){
            const url=req.file.path;
            const filename= req.file.filename;
            updatelistings.image={url,filename};
            updatelistings.save();
        }
    req.flash("success","listing updated!");
        res.redirect(`/listings/${id}`)
    }
    module.exports.destroy=async(req,res)=>{
        let {id}=req.params;
        const deletelistings=await Listings.findByIdAndDelete(id);
        req.flash("success"," listing deleted!");
    res.redirect("/listings")}