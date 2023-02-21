const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    previousHash:{type:String},
    epoch_timeStamp : {type:String},
    data : {type:Object},
    hash: {type:String},
    index: {type:Number}
})

module.exports = {
    blockSchema:blockSchema,
    blockmodel :mongoose.model('block',blockSchema)
};