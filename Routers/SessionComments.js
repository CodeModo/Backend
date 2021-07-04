const express = require('express');

const mongoose = require('mongoose');

const Session = require('../Models/Session');
const Instructor = require('../Models/Instructor');
const Student = require('../Models/Student');
const Parent = require('../Models/Parent');
const Admin = require('../Models/Admin');

const CommentRouter = express.Router();

const authentication = require('../Middleware/Authentication');

module.exports = CommentRouter;

//Get a commenter name 
CommentRouter.get('/commenter/:commentId', async (req, res) => {
    try {
        const comment = await Session.findOne({"comments._id": req.params.commentId },
            { comments: { $slice: 1 } }
        ).exec();
        console.log(comment)
        if (comment != null) {
            let commenterName = await Instructor.findOne({ _id: comment.comments[0].commenterId }).exec();
            if(commenterName == null){
                commenterName = await Student.findOne({ _id: comment.comments[0].commenterId  }).exec();
                if(commenterName == null){
                    commenterName = await Parent.findOne({ _id: comment.comments[0].commenterId  }).exec();
                    if(commenterName == null){
                    commenterName = await Admin.findOne({ _id: comment.comments[0].commenterId  }).exec();
                    }
                }
            }
            res.statusCode = 200;
            res.send({ "Commenter":  commenterName});
        } else {
            res.statusCode = 404;
            res.send({ "message": "comment not found!" });
        }
    } catch (err) {
        console.log(err.message)
        res.statusCode = 422;
        res.send({ "message": "Something wrong, retry again!" });
    }
});

//Get a list of all comments on a session
CommentRouter.get('/:sessionId', async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.sessionId }).exec();
        if (session != null) {
            let commenterName = await Instructor.findOne({ _id: session.commenterId }).exec();
            if(commenterName == null){
                commenterName = await Student.findOne({ _id: session.commenterId }).exec();
                if(commenterName == null){
                    commenterName = await Parent.findOne({ _id: session.commenterId }).exec();
                }
            }
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
CommentRouter.use(authentication);

//Post a new comment
CommentRouter.post('/:sessionId', async (req, res) => {
    const {comment} = req.body;
    try {
        const session = await Session.findOne({ _id: req.params.sessionId }).exec();
        if (session != null) {
            let newComment = {commenterId : req.signedData.id, comment};
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

