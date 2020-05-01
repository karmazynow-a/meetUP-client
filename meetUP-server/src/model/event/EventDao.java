package model.event;

import java.util.List;

public interface EventDao {
     
    public List<Event> getEvent();
    public Event getEventByID(Integer id);
    public int save(Event event);
    public int update(Event event);
    public int delete(Integer id);
}