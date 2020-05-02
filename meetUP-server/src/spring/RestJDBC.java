package spring;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import model.comment.Comment;
import model.comment.CommentDaoImpl;
import model.event.Event;
import model.event.EventDaoImpl;
import model.participation.Participation;
import model.participation.ParticipationDaoImpl;
import model.person.Person;
import model.person.PersonDaoImpl;


@Controller(value = "JdbcController")
@RequestMapping("/rest")
public class RestJDBC {
	
	@Autowired
	CommentDaoImpl commentDao;
	
	@Autowired
	EventDaoImpl eventDao;
	
	@Autowired
	ParticipationDaoImpl participationDao;
	
	@Autowired
	PersonDaoImpl personDao;
	
	
	/*** COMMENT MAPPING ***/
	@RequestMapping(value = "/comment", method = RequestMethod.GET)
	public @ResponseBody List<Comment> getAllComments() {
		return commentDao.getComment();
	}
	
	@RequestMapping(value = "/comment/{id}", method = RequestMethod.GET)
	public @ResponseBody Comment getCommentById(@PathVariable int id) {
		return commentDao.getCommentByID(id);
	}
	
	@RequestMapping(value = "/comment/event/{id}", method = RequestMethod.GET)
	public @ResponseBody List<Map<String, Object>> getCommentByEvent(@PathVariable int id) {
		return commentDao.getCommentByEventId(id);
	}
	
	@RequestMapping(value = "/comment/{id}", method = RequestMethod.DELETE)
	public @ResponseBody int deleteComment(@PathVariable int id) {
		return commentDao.delete(id);
	}
	
	@RequestMapping(value = "/comment", method = RequestMethod.POST)
	public @ResponseBody int addComment(@RequestBody Comment comment) {
		return commentDao.save(comment);
	}
	
	@RequestMapping(value = "/comment", method = RequestMethod.PUT)
	public @ResponseBody int updateComment(@RequestBody Comment comment) {
		return commentDao.update(comment);
	}
	
	/*** EVENT MAPPING ***/
	@RequestMapping(value = "/event", method = RequestMethod.GET)
	public @ResponseBody List<Event> getAllEvents() {
		return eventDao.getEvent();
	}
	
	@RequestMapping(value = "/event/{id}", method = RequestMethod.GET)
	public @ResponseBody Event getEventById(@PathVariable int id) {
		return eventDao.getEventByID(id);
	}
	
	@RequestMapping(value = "/event/key/{key}", method = RequestMethod.GET)
	public @ResponseBody Event getEventByKey(@PathVariable String key) {
		return eventDao.getEventByKey(key);
	}
	
	@RequestMapping(value = "/event/details/{id}", method = RequestMethod.GET)
	public @ResponseBody List<Map<String, Object>> getEventDetailsById(@PathVariable int id) {
		return eventDao.getEventDetailsByID(id);
	}
	
	@RequestMapping(value = "/event/author/{id}", method = RequestMethod.GET)
	public @ResponseBody List<Map<String, Object>> getEventByAuthorId(@PathVariable int id) {
		return eventDao.getEventByAuthorID(id);
	}
	
	@RequestMapping(value = "/event/person/{id}", method = RequestMethod.GET)
	public @ResponseBody List<Map<String, Object>> getEventByPersonId(@PathVariable int id) {
		return eventDao.getEventByPersonID(id);
	}
	
	@RequestMapping(value = "/event/{id}", method = RequestMethod.DELETE)
	public @ResponseBody int deleteEvent(@PathVariable int id) {
		return eventDao.delete(id);
	}
	
	@RequestMapping(value = "/event", method = RequestMethod.POST)
	public @ResponseBody int addEvent(@RequestBody Event event) {
		return eventDao.save(event);
	}
	
	@RequestMapping(value = "/event", method = RequestMethod.PUT)
	public @ResponseBody int updateEvent(@RequestBody Event event) {
		return eventDao.update(event);
	}
	
	/*** PARTICIPATION MAPPING ***/
	@RequestMapping(value = "/participation", method = RequestMethod.GET)
	public @ResponseBody List<Participation> getAllPps() {
		return participationDao.getParticipation();
	}
	
	@RequestMapping(value = "/participation/event/{id}", method = RequestMethod.GET)
	public @ResponseBody List<Map<String, Object>> getPpsByEventId(@PathVariable int id) {
		return participationDao.getParticipationByEventID(id);
	}
	
	@RequestMapping(value = "/participation/{person_id}/{event_id}", method = RequestMethod.DELETE)
	public @ResponseBody int deletePp(@PathVariable int person_id, @PathVariable int event_id) {
		return participationDao.delete(person_id, event_id);
	}
	
	@RequestMapping(value = "/participation", method = RequestMethod.POST)
	public @ResponseBody int addPp(@RequestBody Participation pp) {
		return participationDao.save(pp);
	}
	
	/*** PERSON MAPPING ***/
	@RequestMapping(value = "/person", method = RequestMethod.GET)
	public @ResponseBody List<Person> getAllPeople() {
		return personDao.getPerson();
	}
	
	@RequestMapping(value = "/person/{id}", method = RequestMethod.GET)
	public @ResponseBody Person getPersonById(@PathVariable int id) {
		return personDao.getPersonByID(id);
	}
	
	@RequestMapping(value = "/person/email/{email}/", method = RequestMethod.GET)
	public @ResponseBody Person getPersonById(@PathVariable String email) {
		return personDao.getPersonByEmail(email);
	}
	
	@RequestMapping(value = "/person/{id}", method = RequestMethod.DELETE)
	public @ResponseBody int deletePerson(@PathVariable int id) {
		return personDao.delete(id);
	}
	
	@RequestMapping(value = "/person", method = RequestMethod.POST)
	public @ResponseBody int addPerson(@RequestBody Person person) {
		return personDao.save(person);
	}
	
	@RequestMapping(value = "/person", method = RequestMethod.PUT)
	public @ResponseBody int updatePerson(@RequestBody Person person) {
		return personDao.update(person);
	}
	
}