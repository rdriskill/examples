# discoveryService #

The purpose of this project is to experiment with microservices using [Spring Boot](https://projects.spring.io/spring-boot/).
Created using [Spring Initializr](https://start.spring.io/).

This is a service registry using [Eureka](https://github.com/netflix/eureka). This allows microservices to register themselves and discover each other.

## Building ##
To build the project, execute one of the commands below in the project root.

	./mvnw clean package
	
This command will download and run [Maven](https://maven.apache.org/) without having it installed.

## Running ##

To run the project, execute one of the commands below in the project root.

	java -jar target/discoveryService-{version}.jar
	
	./mvnw spring-boot:run

## Links ##

* [Microservices Guide](https://github.com/rdriskill/docs/blob/master/microservices.md)
* [Eureka Dashboard](http://localhost:8761/)
* [Eureka Apps XML] (http://localhost:8761/eureka/apps/)
* [Spring Boot Endpoints](http://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-endpoints.html)


## Developers ##

Ryan Driskill, Developer, ryandriskill@outlook.com