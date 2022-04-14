const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//create schema
const PizzaSchema = new Schema({
    pizzaName: { type: String, required: 'whata da pizza name?', trim: true },
    createdBy: { type: String, required: 'who mada da pizza?', trim: true },
    createdAt: { type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal) },
    size: { type: String, required: true, enum: ['Personal', 'Small', 'Medium', 'Large', 'Diabetus'], default: 'Large' },
    toppings: [],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
},
{
    toJSON: { virtuals: true, getters: true }, id: false
}
);

// counta da comments
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// maka da model
const Pizza = model('Pizza', PizzaSchema);

// send out da model
module.exports = Pizza;