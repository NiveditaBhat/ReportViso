![alt text](https://github.com/NiveditaBhat/ReportViso/blob/master/src/assets/logo.PNG)

### [Demo](http://reportviso-env.rp2pp9hekv.eu-central-1.elasticbeanstalk.com)

# ReportViso

ReportViso is a weld report (MR Report) visualization tool created with MEAN stack technologies. Traditionally, MR reports are viewed on CAD (Computer Aided Design) software like NX which are licensed and sometimes slow while displaying heavy content. ReportViso is developed with open source JavaScript Frameworks like angular, node, d3 which are fast and responsive. It’s not heavy on your computer hardware and is freely available. It is no replacement to CAD but a first step towards developing web based visualizing tools independent of CAD.

ReportViso is designed to showcase the the kind of work I have done in past as a web developer. Its an effort to create a prototype or a mockup of the projects I have been associated with. 

## Built with 

### 1.Front End 

#### a) Angular 6  

It is used as the backbone for front end of the website. The following some of the features of angular are used to design a responsive website
* Modules,Components,services
* Data binding
* Http client 
* Interceptors
* Observers
* Routing
* Forms
#### b) d3 
It is a javascript library for 2D visualizations. It is used to create 2D graph (svg) for visualizing weld points and curves.
#### c) gui.dat 
It is used for creating the interactive panel for interacting with 2D graph of weld points.
#### d) Bootstrap 4 
It is used for styling the website by utilizing features like grid layout,cards, modal, buttons etc.
#### e) chart.js 
It is a great library to create responsive charts.
#### f) datatables with bootstrap 
It is used for creating tables which are scalable,dynamic and responsive.

### 2. Backend

#### a) Nodejs

* REST APIs are designed on node js for the CRUD operations – Creating/Saving report,Read/Displaying report,Updating/Renaming Report,Deleting Report
* Authentication and Authorization of the user is done with JSON Web tockens

### 3. Database

* MongoDB with Mongoose is the database used to store MR reports and user info as JSON. Database is used to perform basic CRUD operations.


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
