// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
const Workout = require("../models/Workout.js");
const Exercise = require("../models/Exercise.js");

module.exports = function(app) {
    // API route to get all workouts along with their exercises saved in the db
    app.get("/api/workouts", function(req, res) {

        Workout.find({})
        .populate("exercises")
        .then(dbLibrary => {
            res.json(dbLibrary);
        })
        .catch(err => {
            res.json(err);
        });
     });

    // API route to get all workouts saved in the db
    app.get("/api/exercises/", function(req, res) {

       Exercise.find({})
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });



    // API route to create a new workout
    app.post("/api/workouts/", function(req, res) {
        Workout.find({})
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });

  };