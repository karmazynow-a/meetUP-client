package api;

import java.util.List;

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
import model.participation.CompositeKey;
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
    	@SuppressWarnings("unchecked")
    	List<Person> people = (List<Person>) entityManager.createNamedQuery("findPeople").getResultList();
    	return people;
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
	public List<Person> getPersonByEmail(@PathParam("email") String email) {
    	String query = "SELECT p.id, p.fname, p.lname, p.email, p.password FROM Person p WHERE p.email= :email";
		return (List<Person>) entityManager.createQuery(query, Person.class).setParameter("email", email).getResultList();
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
    @GET
    @Path("/comment")
    @Produces({MediaType.APPLICATION_JSON})
	public List<Comment> getAllComments() {
    	@SuppressWarnings("unchecked")
    	List<Comment> comments = (List<Comment>) entityManager.createNamedQuery("findComments").getResultList();
    	return comments;
	}
    
    @GET
    @Path("/comment/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public Comment getCommentById(@PathParam("id") String id) {
    	return (Comment) entityManager.find(Comment.class, Integer.parseInt(id));
	}
    
    @SuppressWarnings({ "rawtypes" })
	@GET
    @Path("/comment/event/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public List getCommentByEvent(@PathParam("id") String id) {
    	String query = "SELECT c.content, c.date, c.id, c.event_id, p.id AS author_id, p.lname AS author_lname, p.fname AS author_fname FROM Comment c "
					+ "JOIN Event e ON e.id=c.event_id "
					+ "JOIN Person p ON p.id=c.author_id "
					+ "WHERE e.id = :id";
		return entityManager.createQuery(query).setParameter("id", Integer.parseInt(id)).getResultList();
	}
    
	@DELETE
	@Path("/comment/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public int deleteComment(@PathParam("id") String id) {
		try {
			entityTransaction.begin();
	        Comment entity = (Comment) entityManager.find(Comment.class, Integer.parseInt(id));
	        entityManager.remove(entity);           
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
    
	@POST
	@Path("/comment")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int addComment(Comment comment) {
		try {
			entityTransaction.begin();
	        entityManager.persist(comment);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
	
	@PUT
	@Path("/comment")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int updateComment(Comment comment) {
		try {
			entityTransaction.begin();
			entityManager.merge(comment);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}

	/*** EVENT MAPPING ***/
    @GET
    @Path("/event")
    @Produces({MediaType.APPLICATION_JSON})
	public List<Event> getAllEvents() {
    	@SuppressWarnings("unchecked")
    	List<Event> events = (List<Event>) entityManager.createNamedQuery("findEvents").getResultList();
    	return events;
	}
    
    @GET
    @Path("/event/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public Event getEventById(@PathParam("id") String id) {
    	return (Event) entityManager.find(Event.class, Integer.parseInt(id));
	}
    
    @SuppressWarnings({"rawtypes" })
	@GET
    @Path("/event/key/{key}")
    @Produces({MediaType.APPLICATION_JSON})
	public List getEventByKey(@PathParam("key") String key) {
    	String query = "SELECT e.id, e.name, e.date, e.key, e.author_id FROM Event e WHERE e.key = :key";
		return entityManager.createQuery(query).setParameter("key", key).getResultList();
	}
    
    @SuppressWarnings("rawtypes")
	@GET
    @Path("/event/details/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public List getEventDetailsById(@PathParam("id") String id) {
    	String query = "SELECT e.name, e.date, e.key, e.author_id, p.lname AS author_lname, p.fname AS author_fname FROM Event e "
				+ "JOIN Person p ON p.id=e.author_id "
				+ "WHERE e.id = :id";
    	
		return entityManager.createQuery(query).setParameter("id", Integer.parseInt(id)).getResultList();
	}
    
    @SuppressWarnings("rawtypes")
	@GET
    @Path("/event/author/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public List getEventByAuthorId(@PathParam("id") String id) {
    	String query = "SELECT e.id, e.name, e.date, e.key FROM Event e "
				+ "WHERE e.author_id = :id";
    	
		return entityManager.createQuery(query).setParameter("id", Integer.parseInt(id)).getResultList();
	}
    
    @SuppressWarnings("rawtypes")
	@GET
    @Path("/event/person/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public List getEventByPersonId(@PathParam("id") String id) {
    	String query = "SELECT e.id, e.name, e.date, e.author_id, p.lname AS author_lname, p.fname AS author_fname FROM Participation r "
				+ "JOIN Event e ON e.id=r.event_id JOIN Person p ON p.id=e.author_id "
				+ "WHERE r.person_id = :id";
    	
		return entityManager.createQuery(query).setParameter("id", Integer.parseInt(id)).getResultList();
	}
    
	@DELETE
	@Path("/event/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public int deleteEvent(@PathParam("id") String id) {
		try {
			entityTransaction.begin();
	        Event entity = (Event) entityManager.find(Event.class, Integer.parseInt(id));
	        entityManager.remove(entity);           
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
    
	@POST
	@Path("/event")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int addEvent(Event event) {
		try {
			entityTransaction.begin();
	        entityManager.persist(event);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
	
	@PUT
	@Path("/event")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int updateEvent(Event event) {
		try {
			entityTransaction.begin();
			entityManager.merge(event);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
	
	/*** PARTICIPATION MAPPING ***/
    @SuppressWarnings("unchecked")
	@GET
    @Path("/participation")
    @Produces({MediaType.APPLICATION_JSON})
	public List<Participation> getAllPps() {
    	return (List<Participation>) entityManager.createNamedQuery("findParticipations").getResultList();
	}
    
    @SuppressWarnings("rawtypes")
	@GET
    @Path("/participation/event/{id}")
    @Produces({MediaType.APPLICATION_JSON})
	public List getPpsByEventId(@PathParam("id") String id) {
    	String query = "SELECT p.lname, p.fname FROM Participation r "
				+ "JOIN Person p ON p.id=r.person_id "
				+ "WHERE r.event_id = :id";
    	
		return entityManager.createQuery(query).setParameter("id", Integer.parseInt(id)).getResultList();
	}
    
	@DELETE
	@Path("/participation/{person_id}/{event_id}")
    @Produces({MediaType.APPLICATION_JSON})
	public int deletePp(@PathParam("person_id") String person_id, @PathParam("event_id") String event_id) {
		Integer pId = Integer.parseInt(person_id);
		Integer eId = Integer.parseInt(event_id);
		
		Event event = entityManager.find(Event.class, eId);
		
		if (event.getAuthor_id().equals(pId)) {
			System.out.println("Proba usuniecia autora z wydarzenia!");
			return -1;
		}
		
		try {
			entityTransaction.begin();
			CompositeKey key = new CompositeKey(pId, eId);
	        Participation entity = (Participation) entityManager.find(Participation.class, key);
	        entityManager.remove(entity);           
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}

	@POST
	@Path("/participation")
	@Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
	public int addPp(Participation p) {
		try {
			entityTransaction.begin();
	        entityManager.persist(p);
	        entityManager.flush();
	        entityTransaction.commit();
	        return 1;
		} catch (Exception ex) {
			return 0;
		}
	}
}