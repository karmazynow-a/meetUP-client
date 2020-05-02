package model.comment;

import java.util.List;
import java.util.Map;
 
public interface CommentDao {
     
    public List<Comment> getComment();
    public List<Map<String, Object>> getCommentByEventId(Integer event_id);
    public Comment getCommentByID(Integer id);
    public int save(Comment comment);
    public int update(Comment comment);
    public int delete(Integer id);
}