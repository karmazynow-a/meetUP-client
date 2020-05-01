package model.comment;

import java.util.List;
 
public interface CommentDao {
     
    public List<Comment> getComment();
    public List<Comment> getCommentByEvent(Integer event_id);
    public Comment getCommentByID(Integer id);
    public int save(Comment comment);
    public int update(Comment comment);
    public int delete(Integer id);
}