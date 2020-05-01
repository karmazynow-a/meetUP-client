package model.person;

import java.util.List;

public interface PersonDao {

    public List<Person> getPerson();
    public Person getPersonByID(Integer id);
    public int save(Person person);
    public int update(Person person);
    public int delete(Integer id);
    
}
