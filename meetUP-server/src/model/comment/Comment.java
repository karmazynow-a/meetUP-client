package model;

public class Comment {
	private Integer id;
	private Integer author_id;
	private Integer event_id;
	private String content;
	
	public Comment() {}
	public Comment(Integer id, Integer author_id, Integer event_id, String content) {
		this.id = id;
		this.author_id = author_id;
		this.event_id = event_id;
		this.content = content;
	}
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	public Integer getAuthor_id() {return author_id;}
	public void setAuthor_id(Integer author_id) {this.author_id = author_id;}
	public Integer getEvent_id() {return event_id;}
	public void setEvent_id(Integer event_id) {this.event_id = event_id;}
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}
}