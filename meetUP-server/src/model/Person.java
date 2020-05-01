package model;

//import javax.xml.bind.annotation.XmlRootElement;
//@XmlRootElement
public class Person {
	  private String nickname ;
	  private String password ;
	  private Integer id;
	  
	  public Person () {}
	  public Person (String nickname, String password, Integer id) {
		  this.nickname = nickname;
		  this.password = password;
		  this.id = id;
	  }
	
	  public void setNickname (String nickname) {this.nickname = nickname;}
	  public String getNickname () {return this.nickname;}
	  
	  public void setId (Integer id) {this.id = id;}
	  public Integer getId() {return this.id;}
	  
	  public void setPassword (String password) {this.password = password;}
	  public String getPassword () {return this.password;}
}
