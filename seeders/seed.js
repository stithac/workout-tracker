// Note: The seed file was changed from the starter code to allow for a separate Exercise collection.  As a result, the exercises are added before the workouts are added with references to the exercises

// Dependencies
let mongoose = require("mongoose");
let db = require("../models");

// Global Variables
let exercises = [];
let exerciseIds = [];

// Mongo connection
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// Exercises are first created
let exerciseSeed = [
    {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4
    },
    {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
    },
    {
        type: "resistance",
        name: "Push Press",
        duration: 25,
        weight: 185,
        reps: 8,
        sets: 4
    },
    {
        type: "cardio",
        name: "Running",
        duration: 25,
        distance: 4
    },
    {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 285,
        reps: 10,
        sets: 4
    },
    {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
    },
    {
        type: "resistance",
        name: "Quad Press",
        duration: 30,
        weight: 300,
        reps: 10,
        sets: 4
    },
    {
        type: "resistance",
        name: "Bench Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
    },
    {
        type: "resistance",
        name: "Military Press",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
    }
]

// The Exercise collection deletes everything and then adds the exerciseSeed.  Once created, the Workout collection is cleared and the workout objects are created with references to the Exercises
db.Exercise.deleteMany({})
    .then(() => db.Exercise.collection.insertMany(exerciseSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        exercises = data.ops;
        exercises.forEach(exercise => {
            exerciseIds.push(exercise._id)
        });
    })
    .then(() => {
        db.Workout.deleteMany({})
            .then(() => console.log("Exercise ids to be added to workout:"))
            .then(() => console.log(exerciseIds))
            .then(() => {
                return db.Workout.collection.insertMany(
                    [
                        {
                            day: new Date().setDate(new Date().getDate() - 10),
                            exercises: [exerciseIds[0]]
                        },
                        {
                            day: new Date().setDate(new Date().getDate() - 9),
                            exercises: [exerciseIds[1]]
                        },
                        {
                            day: new Date().setDate(new Date().getDate() - 8),
                            exercises: [exerciseIds[2]]
                        },
                        {
                            day: new Date().setDate(new Date().getDate() - 7),
                            exercises: [exerciseIds[3]]
                        },
                        {
                            day: new Date().setDate(new Date().getDate() - 6),
                            exercises: [exerciseIds[4]]
                        },
                        {
                            day: new Date().setDate(new Date().getDate() - 5),
                            exercises: [exerciseIds[5]]
                        },
                        {
                            day: new Date(new Date().setDate(new Date().getDate() - 4)),
                            exercises: [exerciseIds[6]]
                        },
                        {
                            day: new Date(new Date().setDate(new Date().getDate() - 3)),
                            exercises: [exerciseIds[7]]
                        },
                        {
                            day: new Date(new Date().setDate(new Date().getDate() - 2)),
                            exercises: [exerciseIds[8]]
                        }
                    ]);
            })
            .then(data => {
                console.log(data.result.n + " records inserted!");
                process.exit(0);
            })
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});




