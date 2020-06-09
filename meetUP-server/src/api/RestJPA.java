package api;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import model.comment.Comment;
import model.event.Event;
import model.participation.Participation;
import model.person.Person;

@Path("/rest")
public class RestJPA {
	
    private EntityManagerFactory managerFactory; 
    private EntityManager entityManager;
    private EntityTransaction entityTransaction;
    
    public RestJPA() {
        managerFactory = Persistence.createEntityManagerFactory("PU_Postgresql");
        entityManager = managerFactory.createEntityManager();
        entityTransaction = entityManager.getTransaction(); 
    }
    
	/*** PERSON MAPPING ***/
    
    @GET
    @Path("/person")
    @Produces({MediaType.APPLICATION_JSON})
	public List<Person> getAllPeople() {
    	List<Person> people = null;
    	try {
            @SuppressWarnings("unchecked")
            List<Person> resultList = (List<Person>) entityManager.createNamedQuery("findPeople").getResultList();
            people = resultList;
        } catch (Exception e) {
            System.out.println("Failed !!! " + e.getMessage());
        }
        return people;//.toArray(new Person[0]);
	}
    
    @GET
    @Path("/person/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public Person getPersonById(@PathParam("id") String id) {
    	return (Person) entityManager.find(Person.class, Integer.parseInt(id));
	}
    
    @GET
    @Path("/person/email/{email}")
    @Produces({MediaType.APPLICATION_JSON})
	public Person getPersonByEmail(@PathParam("email") String email) {
    	String sqlQuery = "SELECT id, fname, lname, email, password FROM Person WHERE email= :email";
		return (Person) entityManager.createQuery(sqlQuery, Person.class).setParameter("email", email).getSingleResult();
	}
	
	@DELETE
	@Path("/person/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public int deletePerson(@PathParam("id") String id) {
		try {
			entityTransaction.begin();
	        Person entity = (Person) entityManager.find(Person.class, Integer.parseInt(id));
	        entityManager.remove(entity);           
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
	
	@POST
	@Path("/person")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int addPerson(Person person) {
		try {
			entityTransaction.begin();
	        entityManager.persist(person);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
	
	@PUT
	@Path("/person")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int updatePerson(Person person) {
		try {
			entityTransaction.begin();
			entityManager.merge(person);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
	
	
	/*** COMMENT MAPPING ***/
    /*
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
	*/
	/*** EVENT MAPPING ***/
	/*
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
	*/
	
	/*** PARTICIPATION MAPPING ***/
	/*
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
	*/
}