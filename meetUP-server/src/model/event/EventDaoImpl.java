package model.event;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;


public class EventDaoImpl implements EventDao{
    @Autowired
    @Qualifier("dbDataSource")
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;
    
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

	@Override
	public List<Event> getEvent() {
		List<Event> events = new ArrayList<Event>();
		String query = "SELECT id, name, date, key, author_id FROM event";
		jdbcTemplate = new JdbcTemplate(dataSource);
		List<Map<String, Object>> eventRows = jdbcTemplate.queryForList(query);
		
		for(Map<String, Object> eventRow : eventRows) {
			Event event = new Event (
					Integer.parseInt(String.valueOf(eventRow.get("id"))),
					String.valueOf(eventRow.get("name")),
					String.valueOf(eventRow.get("date")),
					String.valueOf(eventRow.get("key")),
					Integer.parseInt(String.valueOf(eventRow.get("author_id")))
					);
			events.add(event);					
		}
		
		return events;
	}

	@Override
	public Event getEventByID(Integer id) {
		String query = "SELECT id, name, date, key, author_id FROM event WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.queryForObject(query,  new Object[]{id}, new BeanPropertyRowMapper<Event>(Event.class));
	}
	
	@Override
	public int save(Event event) {
		String query = "INSERT INTO event (name, date, key, author_id) VALUES (?, ?, ?, ?)";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, event.getName(), event.getDate(), event.getKey(), event.getAuthor_id());
	}

	@Override
	public int update(Event event) {
		String query = "UPDATE event SET name=?, date=?, key=?, author_id=? WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, event.getName(), event.getDate(), event.getKey(), event.getId());
	}

	@Override
	public int delete(Integer id) {
		String sql = "DELETE FROM event WHERE id=?" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(sql, new Object[]{id});
	}
	
	// get details of event
	public List<Map<String, Object>> getEventDetailsByID(int id) {
		String query = "SELECT e.name, e.date, e.key, p.lname, p.fname FROM event e "
				+ "JOIN person p ON p.id=e.author_id "
				+ "WHERE e.id=?";
			
		List<Map<String, Object>> eventRows = jdbcTemplate.queryForList(query, new Object[]{id});
			
		return eventRows;
	}

	// get all events that one is author
	public List<Map<String, Object>> getEventByAuthorID(int id) {
		String query = "SELECT e.id, e.name, e.date, e.key FROM event e "
				+ "WHERE e.author_id=?";
		
		List<Map<String, Object>> eventRows = jdbcTemplate.queryForList(query, new Object[]{id});
		
		return eventRows;
	}
	
	// get all events that one is participant
	public List<Map<String, Object>> getEventByPersonID(int id) {
		String query = "SELECT e.id, e.name, e.date, p.lname AS author_lname, p.fname AS author_fname FROM participation r "
				+ "JOIN event e ON e.id=r.event_id JOIN person p ON p.id=e.author_id "
				+ "WHERE r.person_id=?";
		
		List<Map<String, Object>> eventRows = jdbcTemplate.queryForList(query, new Object[]{id});
		
		return eventRows;
	}

}
