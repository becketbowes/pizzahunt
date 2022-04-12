const { Pizza } = require('../models');

const pizzaController = {
    //get all pies
    getAllPizza(req, res) {
        Pizza.find({})
        .populate({ path: 'comments', select: '-__v' })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => { console.log(err); res.status(400).json(err); });
    },
    //get a pie
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({ path: 'comments', select: '-__v' })
        .select('-__v')
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'Ho! Whersa tha Pizza?' });
                return;
            }
            res.json(dbPizzaData)
        })
        .catch(err => { console.log(err); res.status(400).json(err); });
    },
    //maka da pie
    createPizza({ body }, res) {
        Pizza.create(body)
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.status(400).json(err));
      },
    //fixa da pie
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'Ho! Who tooka da pizza?' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },
    //tossa da pie
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'we don hava da pizza' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;