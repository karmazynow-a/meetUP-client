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
		String query = "SELECT id, name, date, key FROM event";
		jdbcTemplate = new JdbcTemplate(dataSource);
		List<Map<String, Object>> eventRows = jdbcTemplate.queryForList(query);
		
		for(Map<String, Object> eventRow : eventRows) {
			Event event = new Event (
					Integer.parseInt(String.valueOf(eventRow.get("id"))),
					String.valueOf(eventRow.get("name")),
					String.valueOf(eventRow.get("date")),
					String.valueOf(eventRow.get("key"))
					);
			events.add(event);					
		}
		
		return events;
	}

	@Override
	public Event getEventByID(Integer id) {
		String query = "SELECT id, name, date, key FROM event WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.queryForObject(query,  new Object[]{id}, new BeanPropertyRowMapper<Event>(Event.class));
	}
	
	@Override
	public int save(Event event) {
		String query = "INSERT INTO event (name, date, key) VALUES (?, ?, ?)";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, event.getName(), event.getDate(), event.getKey());
	}

	@Override
	public int update(Event event) {
		String query = "UPDATE event SET name=?, date=?, key=? WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, event.getName(), event.getDate(), event.getKey(), event.getId());
	}

	@Override
	public int delete(Integer id) {
		String sql = "DELETE FROM event WHERE id=?" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(sql, new Object[]{id});
	}

}
