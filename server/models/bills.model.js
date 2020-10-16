const mongoose = require('mongoose');

const billSchema  = new  mongoose.Schema({
    item_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'items' },
    quantity:Number,
    created_date:Date
},{timstamps:true}); 

module.exports =  mongoose.model("bills",billSchema);