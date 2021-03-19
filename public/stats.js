// Global variables
var poundsLifted = [];
var resistanceWorkouts;
// Page color scheme
function generatePalette() {
  const arr = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    'ffa600',
  ];

  return arr;
}
/* Function to populate the chart data
The data that is pulled in from the database is manipulated to display in the charts.
*/
function populateChart(data) {
    console.log("Last 7 workouts (ascending order):", data);
    data = data.reverse();// Put db data in ascending order
    // Empty arrays to hold the combined duration for each exercise type from the past seven workouts and the total duration for each workout from the past seven workouts
    const exercisesArray = [];
    const workoutDurations = [];
    /* For each workout in the data array, loop through the array of exercises and add the durations to get the total duration for the workout. The total durations are pushed to the workoutDurations array.
      Then, loop through all exercises and push to the exercisesArray.  If it comes to an identical name, add the durations to the index.  This gives us the combined duration for each exercise type across all workouts.
    */
    data.forEach(workout => {
        let x = 0;
        for (i = 0; i < workout.exercises.length; i++){
            x += parseInt(workout.exercises[i].duration);
        }
        workoutDurations.push(x);
        workout.exercises.forEach(exercise => {
            if(exercisesArray.some(e => e.name === exercise.name)){
                const name = exercise.name;
                const index = exercisesArray.findIndex(x => x.name == name);
                exercisesArray[index].duration += exercise.duration;
            } else{
                exercisesArray.push({name: exercise.name, duration:exercise.duration});
            }
        });
    });

    console.log("Combined duration for each exercise type from the past seven workouts:", exercisesArray);
    console.log("Total duration of each workout from the past seven workouts:", workoutDurations);

    // Select only the durations from the exercisesArray. (Name and duration are pushed initially)
    durations = exercisesArray.map(exercise => exercise.duration);

    let pounds = calcPoundsByDay(data); // Call calcPoundsByDay with the data from the database and set to pounds
    let combinedPounds = calcTotalPounds(data);// Call calcTotalPounds with the data from the database and set to combinedPounds
    let workouts = workoutNames(data); // Call workoutNames with the data from the database and set to workouts
    let names = resistanceNames(data); // Call resistanceNames with the data from the database and set to names
    const colors = generatePalette(); // Call generatePalette and set result to colors

    let line = document.querySelector('#canvas').getContext('2d');
    let bar = document.querySelector('#canvas2').getContext('2d');
    let pie = document.querySelector('#canvas3').getContext('2d');
    let pie2 = document.querySelector('#canvas4').getContext('2d');

    const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    const labels = data.map(({ day }) => {
        const date = new Date(day);

        return daysOfWeek[date.getDay() ];
    });

  let lineChart = new Chart(line, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Minutes by Day',
          backgroundColor: colors,
          data: workoutDurations,
          fill:false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Total Duration of Each Workout (minutes)',
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Pounds by Day',
          data: pounds,
          backgroundColor: colors,
          borderColor: colors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Resistance Exercises Weight Lifted (lbs)',
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: 'pie',
    data: {
      labels: workouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'All Exercises Performed (By Duration (minutes))',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: names,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: combinedPounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Resistance Exercises Performed (By Weight (lbs))',
      },
    },
  });
}
/* getWeightTotals loops through the data received from the database in order to get the combined weight per workout and the total weight for each resistance exercise.
For each workout, if the weight is >= 0 (which means it is type resistance):
- Check to see if 7 workouts have been pushed to the workoutWeights array.  If so, this means we are adding an exercise to the last workout and we add the exercise.weight to the last entry of the array.  Else, push the exercise.weight to the workoutsWeights array.  workoutsWeights array stores combined weight per workout
- Check the exercisesArray to see if the exercise name exist.  If so, add the weight to the index.  Else, push the exercise name and weight to the exercisesArray. exercisesArray stores total weight per resistance exercise */
function getWeightTotals(data) {
    let exercisesArray = [];
    let workoutWeights = [];

    data.forEach((workout) => {
        workout.exercises.forEach(exercise => {
            if (exercise.weight >= 0) {
                if (workoutWeights.length >= 7){
                    workoutWeights[6] += parseInt(exercise.weight);
                } else {
                    workoutWeights.push(exercise.weight);
                }
                if(exercisesArray.some(e => e.name === exercise.name)){
                    const name = exercise.name;
                    const index = exercisesArray.findIndex(x => x.name == name);
                    exercisesArray[index].weight += exercise.weight;
                } else{
                    exercisesArray.push({name: exercise.name, weight:exercise.weight});
                }
            } else {
                if(workoutWeights.length < 7){
                    workoutWeights.push(0);
                }
            }
        });
    })
    // Creating object with both workoutWeights and exercisesArray. Then return that object
    const weights = {pounds: workoutWeights, combinedPounds: exercisesArray};

    return weights;
}

// Calls the getWeightTotals function and returns weight.pounds
function calcPoundsByDay(data){
    const weight = getWeightTotals(data);
    console.log("Pounds by Day: ", weight.pounds);
    return weight.pounds;
}

// Calls the getWeightTotals function and returns totalWeight
function calcTotalPounds(data){
    const weight = getWeightTotals(data);
    const totalWeight = weight.combinedPounds.map(exercise => exercise.weight);
    return totalWeight;
}
// Calls getWeightTotals and returns only the names of resistance exercises
function resistanceNames(data){
    const weight = getWeightTotals(data);
    const names = weight.combinedPounds.map(exercise => exercise.name);
    return names;
}

// Returns all exercise names
function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);