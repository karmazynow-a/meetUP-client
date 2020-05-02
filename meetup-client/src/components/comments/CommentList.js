import React from 'react'

import Comment from './Comment'

const CommentList = ({comments}) => {
    var outputComments = comments && comments.map(comment => {
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