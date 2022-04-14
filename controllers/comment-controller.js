const { Comment, Pizza } = require('../models');

const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
      console.log(body);
      Comment.create(body)
        .then(({ _id }) => {
          return Pizza.findOneAndUpdate(
            { _id: params.pizzaId },
            { $push: { comments: _id } },
            { new: true, runValidators: true }
          );
        })
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'I no finda tha pizza' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    addReply({ params, body }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body }},
            { new: true, runValidators: true }
        )
        .then(data => {
            if (!data) { 
                res.status(404).json({ message: 'don hava that pizza' }); 
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
    },

    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.replyId }}},
            { new: true }
        )
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
};

module.exports = commentController;