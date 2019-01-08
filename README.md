![alt text](https://github.com/NiveditaBhat/ReportViso/blob/d3f31699be1ef01e10401ff4d924c0d46be22a87/src/assets/logo.PNG)


## ReportViso

ReportViso is a weld report visualization tool created with MEAN stack technologies

## Technologies 

Following are the technologies used in ReportViso.

1.Front End 

-a)Angular 6  - It is used as the backbone for front end of the website. 
The following some of the features of angular are used to design a responsive website
-•	Modules,Components,services
-•	Data binding
-•	Http client 
-•	Interceptors
-•	Observers
-•	Routing
-•	Forms
b) d3.js – It is a javascript library for 2D visualizations. It is used to create 2D graph (svg) for visualizing weld points and curves.
c) gui.dat.js – It is used for creating the interactive panel for interacting with 2D graph of weld points.
d) Bootstrap 4 – It is used for styling the website by utilizing features like grid layout,cards, modal, buttons etc.
e) chart.js -  It is a great library to create responsive charts.
f)datatables with bootstrap – It is used for creating tables which are scalable,dynamic and responsive.

2. Backend
Nodejs – 
•	REST APIs are designed on node js for the CRUD operations – Creating/Saving report,Read/Displaying report,Updating/Renaming Report,Deleting Report
•	Authentication and Authorization of the user is done with JSON Web tockens

3. Database
MongoDB with Mongoose is the database used to store MR reports and user info as JSON. Database is used to perform basic CRUD operations.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
