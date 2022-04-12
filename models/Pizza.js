const { Schema, model } = require('mongoose');

//create schema
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
     createdBy: {
         type: String
     },
     createdAt: {
         type: Date,
         default: Date.now
     },
     size: {
         type: String,
         default: 'Large'
     },
     toppings: []
});

// maka da model
const Pizza = model('Pizza', PizzaSchema);

// send out da model
module.exports = Pizza;
