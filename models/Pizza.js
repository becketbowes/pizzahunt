const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//create schema
const PizzaSchema = new Schema({
    pizzaName: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now, get: (createdAtVal) => dateFormat(createdAtVal) },
    size: { type: String, default: 'Large' },
    toppings: [],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
},
{
    toJSON: { virtuals: true, getters: true }, id: false
}
);

// counta da comments
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// maka da model
const Pizza = model('Pizza', PizzaSchema);

// send out da model
module.exports = Pizza;