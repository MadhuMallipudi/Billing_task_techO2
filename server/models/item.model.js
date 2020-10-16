const mongoose = require("mongoose");

const itemSchema =  new mongoose.Schema({
    name:String,
    price:Number,
    created_date:Date
},{timstamps:true});

module.exports = mongoose.model("items",itemSchema);
