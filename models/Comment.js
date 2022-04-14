const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema({
    //custom id to avoid confusion with parent comment id
    replyId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    replyBody: { type: String, required: 'whadda ya wanna say?', trim: true },
    writtenBy: { type: String, required: 'who saya that?' },
    createdAt: { type: Date, default: Date.now, get: createdAtVal => dateFormat(createdAtVal) }
},
{
    toJSON: { getters: true }
}
);

const CommentSchema = new Schema({
    writtenBy: { type: String, required: 'who saya this?' },
    commentBody: { type: String, required: 'whaddya wanna say?', trim: true },
    createdAt: { type: Date, default: Date.now, get: createdAtVal => dateFormat(createdAtVal) },
    replies: [ReplySchema]
},
{
    toJSON: { virtuals: true, getters: true }, id: false
}
);

// counta da comments to da comments
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;