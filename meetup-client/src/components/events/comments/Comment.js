import React from 'react'

const Comment = ({comment}) => {
    return (
        <div className="card event-summary">
            <div className="card-content grey-text text-darken-3">
                <p>{comment.content}</p>
                <p className="grey-text">{comment.author_fname} {comment.author_lname}</p>
                <p className="grey-text">{comment.date}</p>
            </div>
        </div>
    )
}

export default Comment;