# hw17 Workout-Tracker, 18 MAR 21

#### By Ashley Stith

## Description
This application is a workout tracker that allows a user to view, create and track daily workouts.  The user is able to log multiple exercises of type (resistance or cardio) in a workout for a given day.  It also allows the user to track the name, type, weight, sets, reps, duration and distance traveled for each exercise depending on the type.  In addition, the user is able to add exercises to the most recent workout plan.

A "stats" dashboard is included with 4 charts:

* Total Duration of Each Workout (minutes)
    * Displays the total duration of each workout from the past seven workouts

* Resistance Exercises Weight Lifted (lbs)
    * Displays the combined weight of the resistance exercises from the past seven workouts

* All Exercises Performed (By Duration (minutes))
    * Displays all exercises by duration

* Resistance Exercises Performed (By Weight (lbs))
    * Displays the resistance exercises performed for the past seven workouts by weight

## Features
The application utilizes a Mongo database with Mongoose schema.  It handles routes with Express.  The application is deployed with Heroku and MongoDB Atlas.

## Models
The application includes two models: exercise.js and workout.js.  An index.js file contains an object that includes all models.  All models are stored in the models folder.

The information for each exercise is stored in the exercise collection.
![Exercise Collection](./public/img/exercise-collection-screenshot.PNG)

The workout collection includes the ObjectIds for each of the exercises that are included in the workout.
![Workout Collection](./public/img/workout-collection-screenshot.PNG)

## Site Images
### Homepage
The homepage displays the information for the last workout.  The user is able to add an exercise to the workout or create a new workout
![Site Homepage](./public/img/homepage-screenshot.PNG)

### Workout Form
The following form displays when a user clicks the New Workout button from the home page.  The Exercise Type is required before the Exercise form displays
![Workout Form](./public/img/new-workout-screenshot.PNG)

### Exercise Form
Depending on if the Exercise Type selected is Resistance/Cardio, one of the views of the Exercise form will be displayed
![Resistance Form](./public/img/resistance-screenshot.PNG)

![Cardio Form](./public/img/cardio-screenshot.PNG)

### Dashboard
The dashboard displays data for the last seven workouts
![Dashboard](./public/img/dashboard-screenshot.PNG)

## Dependencies
The application includes the following dependencies:

[Epress NPM package](https://www.npmjs.com/package/express)

[Mongoose](https://mongoosejs.com/)

[Morgan](https://www.npmjs.com/package/morgan)

The application is seeded and invoked locally by using the following commands:

```bash
npm run seed
npm start
```

## Installation
* Install node.js to computer, if not already present.

    * Node.js can be installed from [here](https://nodejs.org/en/).

* Copy all the application files locally to one's machine.

* In a terminal window where you copied the files, install all dependencies. These installations are accomplished by performing the following command:

```bash
npm i
```

## Known Bugs
* Pressing the "Complete" button after adding a new exercise will create a blank workout in the database if the form fields are left blank. This will be resolved in a future release

* Users are able to create multiple workouts for the same day.  Not necessarily a bug, but something to keep in mind.  If done, there will be duplicate day entries in the bar chart

## Technologies Used
* node.js
* MongoDb
* Mongoose
* Express

## Contributor
Please email [Ashley Stith](mailto:ashleyc.stith@gmail.com) with questions or for additional inforamtion.

## Contribution Guidelines
Direct link to repository: https://github.com/stithac/workout-tracker

## Deployment
The site is deployed to heroku: https://arcane-everglades-17005.herokuapp.com/