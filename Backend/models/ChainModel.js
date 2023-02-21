const mongoose = require('mongoose');
const {blockSchema} = require('./blockModel');
const chainSchema = new mongoose.Schema({
    chain : [blockSchema]
})

module.exports = mongoose.model('chain',chainSchema,'blockchain');