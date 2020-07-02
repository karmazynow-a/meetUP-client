import React from 'react'
import moment from 'moment'

import Comment from './Comment'


/**
 * Display comments list with Comment components.
 */
const CommentList = ({comments}) => {
    var sortedComments = comments.sort((a,b) => {
        return moment(a.date, 'DD-MM-YYYY HH:mm') - 
        moment(b.date, 'DD-MM-YYYY HH:mm')
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