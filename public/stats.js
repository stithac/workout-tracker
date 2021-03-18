var poundsLifted = [];
var resistanceWorkouts;

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

function populateChart(data) {
    console.log("Last 7 workouts:", data);
    data = data.reverse();// Put db data in ascending order
    const exercisesArray = [];
    const workoutDurations = [];
    data.forEach(workout => {
        let x = 0;

        for (i = 0; i < workout.exercises.length; i++){
            x += parseInt(workout.exercises[i].duration);
        }
        workoutDurations.push(x);

        workout.exercises.forEach(exercise => {

            if(exercisesArray.some(e => e.name === exercise.name)){
                const name = exercise.name;
                // console.log(name); // Testing
                const index = exercisesArray.findIndex(x => x.name == name);
                // console.log(index); // Testing

                exercisesArray[index].duration += exercise.duration;
            } else{
                exercisesArray.push({name: exercise.name, duration:exercise.duration});
            }
        });
    });

    console.log("Total duration for each exercise type from the past seven workouts:", exercisesArray);
    console.log("Total duration of each workout from the past seven workouts:", workoutDurations);

    durations = exercisesArray.map(exercise => exercise.duration);

    let pounds = calcPoundsByDay(data);
    let combinedPounds = calcTotalPounds(data);
    let workouts = workoutNames(data);
    let names = resistanceNames(data);
    const colors = generatePalette();

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
          label: 'Workout Duration (minutes)',
          backgroundColor: 'red',
          borderColor: 'red',
          data: workoutDurations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
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
          label: 'Pounds',
          data: pounds,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
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
        text: 'All exercises Performed (by duration (minutes))',
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
        text: 'Resistance Exercises Performed (by weight (lbs))',
      },
    },
  });
}

function getWeightTotals(data) {
    let exercisesArray = [];
    let workoutWeights = [];

    data.forEach((workout) => {
        workout.exercises.forEach(exercise => {
            if (exercise.weight >= 0) {
                workoutWeights.push(exercise.weight);

                if(exercisesArray.some(e => e.name === exercise.name)){
                    const name = exercise.name;
                    // console.log(name); // Testing
                    const index = exercisesArray.findIndex(x => x.name == name);
                    // console.log(index); // Testing
                    exercisesArray[index].weight += exercise.weight;
                } else{
                    exercisesArray.push({name: exercise.name, weight:exercise.weight});
                }
            }
        });
    })

    // console.log(workoutWeights); // Testing
    // console.log(exercisesArray); // Testing
    const weights = {pounds: workoutWeights, combinedPounds: exercisesArray};

    return weights;
}

function calcPoundsByDay(data){

    const weight = getWeightTotals(data);
    return weight.pounds;

}

function calcTotalPounds(data){

    const weight = getWeightTotals(data);
    // console.log(weight); // Testing

    const totalWeight = weight.combinedPounds.map(exercise => exercise.weight);
    return totalWeight;
}

function resistanceNames(data){
    const weight = getWeightTotals(data);
    // console.log(weight); // Testing

    const names = weight.combinedPounds.map(exercise => exercise.name);
    // console.log(names); // Testing

    return names;

}

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
