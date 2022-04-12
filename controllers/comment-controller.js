const { Comment, Pizza } = require('../models');

const commentController = {
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                { id: params.pizzaId },
                { $push: { comments: _id }},
                { new: true }
            );
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'Ho, I don seea da pie' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    },

    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Nobody said that, Francis' });
            }
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId }},
                { new: true }
            );
        })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'I don finda da pie' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.json(err));
    }
};

module.exports = commentController;