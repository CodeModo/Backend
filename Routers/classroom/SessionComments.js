const express = require('express');

const mongoose = require('mongoose');

const Session = require('../Models/Classroom/Session');

const CommentRouter = express.Router();


module.exports = CommentRouter;


//Post a new comment
CommentRouter.post('/:sessionId', async (req, res) => {
    const { commenterId, comment} = req.body;
    try {
        const session = await Session.findOne({ _id: req.params.sessionId }).exec();
        if (session != null) {
            let newComment = {commenterId, comment};
            await Session.updateOne({ _id: req.params.sessionId}, { $push: { comments: newComment } });
            res.statusCode = 200;
            res.send({ "message": "Comment added" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Session not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Get a list of all comments on a session
CommentRouter.get('/:sessionId', async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.sessionId }).exec();
        if (session != null) {
            res.statusCode = 200;
            res.send({ "Comments": session.comments });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Session not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});


//Update a specific comment on a session providing its id and session id
CommentRouter.patch('/:sessionId/:commentId', async (req, res) => {
    const { comment } = req.body;
    try {
        const updatedComment = await Session.findOne(
            { _id: req.params.sessionId, "comments._id": req.params.commentId },
            { comments: { $slice: 1 } }
        ).exec();
        if (updatedComment != null) {
            await Session.updateOne(
                { _id: req.params.postId, "comments._id": req.params.commentId },
                {
                    $set: {
                        "comments.$.comment": comment,
                    }
                }
            );
            res.statusCode = 200;
            res.send({ "message": "Comment updated" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Comment not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Delete a comment on a post providing its id and post id
CommentRouter.delete('/:sessionId/:commentId', async (req, res) => {
    try {
        const deletedComment = await Session.findOne(
            { _id: req.params.postId, "comments._id": req.params.commentId },
            { comments: { $slice: 1 } }
        ).exec();
        if (deletedComment != null) {
            await Session.updateOne(
                { _id: req.params.sessionId },
                { $pull: { comments: { _id: req.params.commentId } } }
            );
            res.statusCode = 200;
            res.send({ "message": "Comment deleted" });
        } else {
            res.statusCode = 404;
            res.send({ "message": "Comment not found!" });
        }
    } catch (err) {
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});