import React from 'react'

import Comment from './Comment'

const CommentList = ({comments}) => {
    var sortedComments = comments.sort((a,b) => {
        return new Date(a.date).getTime() - 
            new Date(b.date).getTime()
    }).reverse();

    var outputComments = sortedComments && sortedComments.map(comment => {
        return (
            <Comment comment={comment} key={comment.id}/>
        )
    })

    return (
        <div className="comment-list section">
            {outputComments}
        </div>
    )
}

export default CommentList;