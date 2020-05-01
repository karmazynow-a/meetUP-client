package model.participation;

public class Participation {
	private Integer person_id;
	private Integer event_id;
	
	public Participation() {}
	public Participation(Integer person_id, Integer event_id) {
		this.person_id = person_id;
		this.event_id = event_id;
	}
	
	public Integer getEvent_id() {return event_id;}
	public void setEvent_id(Integer event_id) {this.event_id = event_id;}
	public Integer getPerson_id() {return person_id;}
	public void setPerson_id(Integer person_id) {this.person_id = person_id;}
	
}
