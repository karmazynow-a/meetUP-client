package model.person;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import model.event.Event;

public class PersonDaoImpl implements PersonDao {
    @Autowired
    @Qualifier("dbDataSource")
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;
    
    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

	@Override
	public List<Person> getPerson() {
		List<Person> ppl = new ArrayList<Person>();
		String query = "SELECT id, nickname, password FROM person";
		jdbcTemplate = new JdbcTemplate(dataSource);
		List<Map<String, Object>> pplRows = jdbcTemplate.queryForList(query);
		
		for(Map<String, Object> pplRow : pplRows) {
			Person person = new Person (
					Integer.parseInt(String.valueOf(pplRow.get("id"))),
					String.valueOf(pplRow.get("nickname")),
					String.valueOf(pplRow.get("password"))
					);
			ppl.add(person);
		}
		
		return ppl;
	}

	@Override
	public Person getPersonByID(Integer id) {
		String query = "SELECT id, nickname, password FROM person WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.queryForObject(query,  new Object[]{id}, new BeanPropertyRowMapper<Person>(Person.class));
	}

	@Override
	public int save(Person person) {
		String query = "INSERT INTO person (nickname, password) VALUES (?, ?)";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, person.getNickname(), person.getPassword());
	}

	@Override
	public int update(Person person) {
		String query = "UPDATE person SET nickname=?, password=? WHERE id=?";
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(query, person.getNickname(), person.getPassword(), person.getId());
	}

	@Override
	public int delete(Integer id) {
		String sql = "DELETE FROM person WHERE id=?" ;
		jdbcTemplate = new JdbcTemplate(dataSource);
		return jdbcTemplate.update(sql, new Object[]{id});
	}

}
