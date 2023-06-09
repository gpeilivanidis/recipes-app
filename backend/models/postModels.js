const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    body: {
        type: String,
        required: [true, 'Please add a text body']
    },
    ingredients: [{
        type: String,
        required: [true, 'Please add the ingredients']
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
