const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    photoSrc: { type: String }
})
const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    time: { type: String, required: true },
    author: { type: String, required: true },

})

const user = mongoose.model("user", userSchema)
const article = mongoose.model("article", articleSchema)

module.exports = {
    user,
    article
}