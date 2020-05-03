# meetUP
The web app to sign up for private events. Users can find events only by entering the unique keys and sign up without the awareness of bystanders.

## Instalation
Before running locally server or client app you have to provide database credentials in `meetUP-server/WebContent/WEB-INF/spring/myapp-config.xml` and link to the database in order to send the REST queries in `meetUP-client/src/config.js`

### Server
To run server application locally you can use Eclipse environment with installed Tomcat Server. The details are in the documentation.

Also you will need extra libraries:

* jstl
* postgre

After downloading the *.jar files put them inside `meetUP-server/WebContent/WEB-INF/lib/`.

### Client
not ready now :<

## Technologies
### Client
Framework ReactJS + Redux.

Alsa used:
* [Materialize](https://materializecss.com) for the styles,
* [axios](https://github.com/axios/axios) for the http queries,
* [moment](https://momentjs.com/) for the dates management.

### Server
RESTful web service with JEE and Spring. Database queries are managed with JPA (for now JDBC).

### Database
PostgreSQL cloud database [ElephantSQL](https://www.elephantsql.com/)
