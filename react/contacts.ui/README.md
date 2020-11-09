# README #

## What is this project for? ##
* This is an example application demonstrating the use of React, NPM, and Webpack
  to build a JavaScript application. It also experiments with [Materialize](http://materializecss.com/).

## How do I get set up? ##
* Install NodeJS from [here](https://nodejs.org/en/download/).
* Update NPM install with NodeJS by running the command "npm install npm -g".
* To install NPM dependencies defined in the "package.json" file and run
  run the command "npm install" from this project's root directory.
* Running the command "npm start" will start an http server at [localhost](http://localhost:8080/).

## What do I need to know about building the application? ##
* Anytime JavaScript files change, run the command "npm run package" from the project root
  to rebuild the JavaScript and refresh the page. If your running from the http server
  mentioned previously, the rebuild is performed automatically.
* If the "package.json" file's dependencies are modified, run the command "npm install"
  from the project root to update the dependencies.
* Note that NPM is a development dependency only for building of JavaScript.
  It is not required in any other environment.
* If packaging this application as a WAR file is necessary for deployments, a
  "pom.xml" is included. Note that the JavaScript build must occur prior to the
  packaging the WAR.
* To install a new NPM dependency, running the command "npm install -S {name}" from
  the project root will install the dependency and automatically add it to the
  package.json file.

## What are some coding guidelines? ##
### ReactJS ###
* Keep as many components as possible stateless. Parent components should maintain
  state and pass it to child components via  props, called controller views. This
  centrally isolates state while minimizing redundancy.
* Ajax requests should take place in action creators. This isolates async concerns
  from other code.
* Store data should only be mutated through the registered dispatcher callback. Getter
  methods expose 'views' of the data.
* Validate component props by setting 'propTypes'.
* Use componentWillUpdate() when needing to perform operations in response to a state change.

### Misc ###
* Use pure functions that only rely on the arguments. This ensures no side effects occur
  and that the output is always the same for a given input. Pure functions also improve
  testability.
* Following the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Info ##
* [Flux Application Architecture](https://facebook.github.io/flux/docs/overview.html)

## Who do I talk to? ##
* Ryan Driskill, Developer, ryandriskill@outlook.com
