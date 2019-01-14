# Backend EasyCredit

This backend implements aproach Model View Controller: ?
* The model is the connection to the MySQL db. 
* The view are the routes we connect to and display JSON data (like yoursite.com/api/users/). 
* The controller are the functions that get data from the model and feed it to the view.

connection.escape in controllers is just about performance.

## Development server

Run `npm start` for a dev server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)