const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  cardioName: String,
  distance: Number,
  duration: Number,
  exercise: String,
  weight: Number,
  sets: Number,
  reps: Number,
  resistanceDurantion: Number,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;