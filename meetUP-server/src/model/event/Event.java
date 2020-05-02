package model.event;

public class Event {
	private Integer id;
	private String name;
	private String date;
	private String key;
	private Integer author_id;
	
	public Event() {}
	public Event(Integer id, String name, String date, String key, Integer author_id) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.key = key;
		this.setAuthor_id(author_id);
	}
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	public String getName() {return name;}
	public void setName(String name) {this.name = name;}
	public String getDate() {return date;}
	public void setDate(String date) {this.date = date;}
	public String getKey() {return key;}
	public void setKey(String key) {this.key = key;}
	public Integer getAuthor_id() {return author_id;}
	public void setAuthor_id(Integer author_id) {this.author_id = author_id;}

}
