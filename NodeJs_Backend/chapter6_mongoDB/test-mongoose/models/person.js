let mongoose = require('mongoose')
const { Schema } = require("mongoose")

const personSchema = new Schema({
    name: String,
    age: Number,
    email: {type: String, required: true},
})

module.exports = mongoose.model('Person', personSchema) // mongoose 모델 객체 만드는 함수임