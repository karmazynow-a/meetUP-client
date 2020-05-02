package model.participation;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;

public class ParticipationDaoImpl implements ParticipationDao {
    @Autowired
    @Qualifier("dbDataSource")
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;
    
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

	@Override
	public List<Participation> getParticipation() {
		List<Participation> pps = new ArrayList<Participation>();
		String query = "SELECT person_id, event_id FROM participation";
		jdbcTemplate = new JdbcTemplate(dataSource);
		
		List<Map<String, Object>> ppRows = jdbcTemplate.queryForList(query);
		
		for(Map<String, Object> ppRow : ppRows) {
			Participation pp = new Participation (
					Integer.parseInt(String.valueOf(ppRow.get("person_id"))),
					Integer.parseInt(String.valueOf(ppRow.get("event_id")))
					);
			pps.add(pp);
		}
		
		return pps;
	}
	
	// get all participants of event
	public List<Map<String, Object>> getParticipationByEventID(Integer id) {
		String query = "SELECT p.lname, p.fname FROM participation r "
				+ "JOIN person p ON p.id=r.person_id "
				+ "WHERE r.event_id=?";
		
		jdbcTemplate = new JdbcTemplate(dataSource);
		
		List<Map<String, Object>> ppRows = jdbcTemplate.queryForList(query, id);
		
		return ppRows;
	}

	@Override
	public int save(Participation participation) {
		String query = "INSERT INTO participation (person_id, event_id) VALUES (?, ?)";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, participation.getPerson_id(), participation.getEvent_id());
	}

	@Override
	public int delete(Integer person_id, Integer event_id) {
		String sql = "DELETE FROM participation WHERE person_id=? AND event_id=?" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(sql, person_id, event_id);
	}

}
