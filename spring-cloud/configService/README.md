# configService #

The purpose of this project is to experiment with microservices using [Spring Boot](https://projects.spring.io/spring-boot/).
Created using [Spring Initializr](https://start.spring.io/).

Centralized external configuration service for other services. Storing configuration in the environment
rather than in source code is a recommendation of [twelve-factor application principles](https://12factor.net/config).

## Building ##
To build the project, execute one of the commands below in the project root.

	./mvnw clean package
	
This command will download and run [Maven](https://maven.apache.org/) without having it installed.

## Running ##

To run the project, execute one of the commands below in the project root.

	java -jar target/configService-{version}.jar
	
	./mvnw spring-boot:run

## Links ##

* [Microservices Guide](https://github.com/rdriskill/docs/blob/master/microservices.md)
* View property sources at http://localhost:{port}/{spring.config.name}/{profile}. The value "default" can be used for profile if not are explicitly configured.


## Developers ##

Ryan Driskill, Developer, ryandriskill@outlook.com