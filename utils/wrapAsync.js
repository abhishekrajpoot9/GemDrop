const { error } = require("console")

module.exports=(fn)=>{
  return (req,res,next)=>{
        fn(req,res,next).catch(next)
    }
}