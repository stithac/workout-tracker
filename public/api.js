// This file contains appropriate API fetch calls for the application

const API = {
  // Fetches the /api/workouts GET route and returns the data for the last workout in the database
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();
    return json[json.length - 1];
  },
  // Fetches the /api/workouts/:id PUT route to add an exercise and update the appropriate workout
  async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    return json;
  },
  // Fetches the /api/workouts POST route to create a new workout
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    return json;
  },
  // Fetches the /api/workouts/range GET rout to get the last 7 workouts
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();
    return json;
  },
};
