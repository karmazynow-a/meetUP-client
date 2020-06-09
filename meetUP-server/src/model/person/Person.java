package model.person;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@NamedQuery(name="findPeople", query="SELECT p.id, p.fname, p.lname, p.email, p.password FROM Person p")
public class Person implements Serializable {
	  private static final long serialVersionUID = 1L;
	
	  @Id
	  private Integer id;
	  private String fname;
	  private String lname;
	  private String email;
	  private String password;
	  
	  public Person () {}
	  public Person (Integer id, String lname, String fname, String email, String password) {
		  this.setLname(lname);
		  this.setFname(fname);
		  this.setEmail(email);
		  this.password = password;
		  this.id = id;
	  }
	
	  public void setId (Integer id) {this.id = id;}
	  public Integer getId() {return this.id;}
	  public void setPassword (String password) {this.password = password;}
	  public String getPassword () {return this.password;}
	  public String getFname() {return fname;}
	  public void setFname(String fname) {this.fname = fname;}
	  public String getLname() {return lname;}
	  public void setLname(String lname) {this.lname = lname;}
	  public String getEmail() {return email;}
	  public void setEmail(String email) {this.email = email;}
}
