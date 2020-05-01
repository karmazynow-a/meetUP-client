package model.participation;

import java.util.List;

public interface ParticipationDao {
	
    public List<Participation> getParticipation();
    public int save(Participation participation);
    public int delete(Integer person_id, Integer event_id);
	List<Participation> getParticipationByPersonID(Integer id);
	List<Participation> getParticipationByEventID(Integer id);

}
