const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _Id : mongoose.Schema.Types.ObjectId,
    name : String,
    price : Number,
    category:String,
    unit : String,
    quantity : Number,
    brand : String,
    productImage : String

});

module.exports = mongoose.model('Product', productSchema);