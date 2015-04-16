# MEAN-Little-Big-App-Boilerplate
Complete setup for middle sized MEAN project with authentication, including responsive layout, unit and e2e tests, build scripts and much more.. Ready for deploy to RedHat Openshift platform  

Client
- SPA based on Angular.js
- Each component is separated to single file, and loaded with require.js
- Each module and every method is properly documented, using ng-docs
- Transition between views/states is handled by ui-router
- Forms are validated using ng-messages module and custom directives
- App uses Foundation CSS framework, with angular-foundation module and is fully responsive
- Unit tests are written using Jasmine testing framework
- Karma test runner is used for test execution
- End to end tests are written using Protractor

Server
- Server is based on node.js using express framework
- Data are stored to mongodb using mongoose npm module
- serves client index page and REST api
- code is structured to separated files
- code is tested using mocha framework

Build tools
- Build is handled using GULP task manager

Currently there are 3 main tasks defined:
- 1.build for development
- 2.build for production
- 3.server test runner 

Main build features:
- 1.Less compilation
- 2.Test execution
- 3.Compilation of html templates to js module
- 4.Compilation of index.html template based on environment
- 5.Concatenation and minification of all JS files resulting in single file
- 6.Concatenation and minification of all CSS files resulting in single file

Deploy
- Application is prepared to work with OPENSHIFT
- Create new application on the OPENSHIFT server
- Push this boilerplate to the OPENSHIFT server

Following steps executes:
- MongoDb cartridge is started
- All dependencies from package.json gets installed
- npm start gets executed
- bower install gets started based on package.json configuration
- server gets started
- enjoy :)
