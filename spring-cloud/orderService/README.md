# orderService #

The purpose of this project is to experiment with microservices using [Spring Boot](https://projects.spring.io/spring-boot/). Created using [Spring Initializr](https://start.spring.io/).

This is a microservice representing an order management [bounded context](http://martinfowler.com/bliki/BoundedContext.html). Integrates with [inventoryService](https://github.com/rdriskill/inventoryService) to reduce available inventory.

## Building ##
To build the project, execute one of the commands below in the project root.

	./mvnw clean package
	
This command will download and run [Maven](https://maven.apache.org/) without having it installed.

## Running ##

To run the project, execute one of the commands below in the project root.

	java -jar target/orderService-{version}.jar
	
	./mvnw spring-boot:run
	
## Links ##

* [Microservices Guide](https://github.com/rdriskill/docs/blob/master/microservices.md)

## Developers ##

Ryan Driskill, Developer, ryandriskill@outlook.com