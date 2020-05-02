package model.comment;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class CommentDaoImpl implements CommentDao {
    @Autowired
    @Qualifier("dbDataSource")
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;
    
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
    
	@Override
	public List<Comment> getComment() {
		List<Comment> comments = new ArrayList<Comment>();
		String query = "SELECT id, author_id, event_id, content, date FROM comment"; 
        jdbcTemplate = new JdbcTemplate(dataSource);
        List<Map<String,Object>> commentRows = jdbcTemplate.queryForList(query);
		
        for(Map<String,Object> commentRow : commentRows){
        	Comment comment = new Comment (
        			Integer.parseInt(String.valueOf(commentRow.get("id"))),
        			Integer.parseInt(String.valueOf(commentRow.get("author_id"))),
        			Integer.parseInt(String.valueOf(commentRow.get("event_id"))),
        			String.valueOf(commentRow.get("content")),
        			String.valueOf(commentRow.get("date"))
        			);
        	
            comments.add(comment);
        }
        
		return comments;
	}
	
	@Override
	public List<Map<String, Object>> getCommentByEventId(Integer event_id) {
		String query = "SELECT c.content, c.date, c.id, c.event_id, p.id AS author_id, p.lname AS author_lname, p.fname AS author_fname FROM comment c "
				+ "JOIN event e ON e.id=c.event_id "
				+ "JOIN person p ON p.id=c.author_id "
				+ "WHERE e.id=?";
		
		jdbcTemplate = new JdbcTemplate(dataSource);
		
		List<Map<String,Object>> commentRows = jdbcTemplate.queryForList(query, new Object[]{event_id});
        
		return commentRows;
	}
	
	@Override
	public Comment getCommentByID(Integer id) {
		String query = "SELECT id, author_id, event_id, content, date FROM comment WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.queryForObject(query,  new Object[]{id}, new BeanPropertyRowMapper<Comment>(Comment.class));
	}
	
	@Override
	public int save(Comment comment) {
		String query = "INSERT INTO comment ( author_id, event_id, content, date) VALUES (?, ?, ?, ?)" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, comment.getAuthor_id(), comment.getEvent_id(), comment.getContent(), comment.getDate());
	}
	
	@Override
	public int update(Comment comment) {
		String query = "UPDATE comment SET author_id=?, event_id=?, content=?, date=? WHERE id=?" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, comment.getAuthor_id(), comment.getEvent_id(), comment.getContent(), comment.getDate(), comment.getId());
	}
	
	@Override
	public int delete(Integer id) {
		String query = "DELETE FROM comment WHERE id=?" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, new Object[]{id});
	}
	
	
}
