package model.event;

import java.util.List;
import java.util.Map;

public interface EventDao {
     
    public List<Event> getEvent();
    public Event getEventByID(Integer id);
    public int save(Event event);
    public int update(Event event);
    public int delete(Integer id);
    public List<Map<String, Object>> getEventByPersonID(int id);
}