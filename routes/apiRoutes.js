// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies
const db = require("../models");

module.exports = function(app) {
    // API route to get all workouts along with their exercises saved in the db
    app.get("/api/workouts", function(req, res) {

        db.Workout.find({})
        .populate("exercises")
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
            res.json(err);
        });
     });

     // API route to get the last 7 workouts along with their exercises saved in the db.  All workouts brought in, then exercises populated based on ObjectIds.
    app.get("/api/workouts/range", function(req, res) {

        db.Workout.find({}).sort({$natural: -1}).limit(7)
        .populate("exercises")
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
            res.json(err);
        });
     });

    // API route to get all exercises saved in the db
    app.get("/api/exercises", function(req, res) {

       db.Exercise.find({})
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
        res.status(400).json(err);
        });
    });

    // API route to post new exercise to workout.  WorkoutId is passed in as parameter. After exercise created, it's objectId is added to the workout (with workoutId)
    app.put("/api/workouts/:id", function(req, res) {
        const workoutId = req.params.id;

        db.Exercise.create(req.body)

        .then((results) =>
            db.Workout.findOneAndUpdate({_id: workoutId}, { $push: { exercises: results._id }}, { new : true }))
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
            res.json(err);
        });
    });

    // API route to create a new workout
    app.post("/api/workouts", function(req, res) {

        db.Workout.create({})
        .then(dbResults => {
            res.json(dbResults);
        })
        .catch(err => {
        res.status(400).json(err);
        });

    });

  };