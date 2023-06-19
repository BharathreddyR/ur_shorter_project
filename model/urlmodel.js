const mongoose = require('mongoose')
const url = require('mongoose-type-url');
const validUrl =require('valid-url')

const urlSchema = new mongoose.Schema({
  urlCode: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    longUrl: {
        type: String,
        require: true,
        trim: true,

    },
    shortUrl: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
})
module.exports=mongoose.model('urlModel',urlSchema)