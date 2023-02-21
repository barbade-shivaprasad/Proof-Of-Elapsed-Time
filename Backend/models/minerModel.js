const mongoose = require('mongoose');

const minerSchema = new mongoose.Schema({
    name:{type : String, required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    blocksMined:{type:Number,required:true},
    status:{type:String,required:true}
}) 

module.exports = mongoose.model('miner',minerSchema);