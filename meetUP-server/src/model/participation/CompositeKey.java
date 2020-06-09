package model.participation;

import java.io.Serializable;

public class CompositeKey implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Integer person_id;
	private Integer event_id;
	
	public Integer getPerson_id() {return person_id;}
	public void setPerson_id(Integer person_id) {this.person_id = person_id;}
	public Integer getEvent_id() {return event_id;}
	public void setEvent_id(Integer event_id) {this.event_id = event_id;}
	
	@Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (person_id ^ (person_id >>> 32));
        result = prime * result + (int) (event_id ^ (event_id >>> 32));
        return result;
    }
	
	@Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        
        if (obj == null) {
            return false;
        }
        
        if (getClass() != obj.getClass()) {
            return false;
        }
        
        CompositeKey other = (CompositeKey) obj;
        if (person_id != other.person_id) {
            return false;
        }
        if (event_id != other.event_id) {
            return false;
        }
        return true;
    }
}