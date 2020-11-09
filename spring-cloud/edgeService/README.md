# edgeService #

The purpose of this project is to experiment with microservices using [Spring Boot](https://projects.spring.io/spring-boot/).
Created using [Spring Initializr](https://start.spring.io/).

Provides a unified API to the clients, abstracting the multitude of services underneath.

## Building ##
To build the project, execute one of the commands below in the project root.

	./mvnw clean package
	
This command will download and run [Maven](https://maven.apache.org/) without having it installed.

## Running ##

To run the project, execute one of the commands below in the project root.

	java -jar target/edgeService-{version}.jar
	
	./mvnw spring-boot:run
	
## Links ##

* [Microservices Guide](https://github.com/rdriskill/docs/blob/master/microservices.md)

## Developers ##

Ryan Driskill, Developer, ryandriskill@outlook.com