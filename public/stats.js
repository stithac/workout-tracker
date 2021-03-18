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
    console.log(data); // Testing
    data = data.reverse();// Put db data in data in ascending order
    const exercisesArray = [];
    const workoutDurations = [];
    data.forEach(workout => {
        workout.exercises.forEach(exercise => {
            workoutDurations.push(exercise.duration);

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

    console.log(exercisesArray); // Testing
    console.log(workoutDurations); // Testing
    durations = exercisesArray.map(exercise => exercise.duration);
    // console.log(durations) // Testing

    let pounds = calculateTotalWeight(data);
    let workouts = workoutNames(data);
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
          label: 'Workout Duration In Minutes',
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
        text: 'Pounds Lifted',
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
        text: 'Exercises Performed (by duration)',
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: 'doughnut',
    data: {
      labels: resistanceWorkouts,
      datasets: [
        {
          label: 'Exercises Performed',
          backgroundColor: colors,
          data: poundsLifted,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Resistance Exercises Performed (by weight)',
      },
    },
  });
}

function calculateTotalWeight(data) {

    let totals = [];
    data.forEach((workout) => {
        const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
            if (type === 'resistance') {
                workout.exercises.forEach(exercise => {
                        if(poundsLifted.some(e => e.name === exercise.name)){
                            const name = exercise.name;
                            // console.log(name); // Testing
                            const index = poundsLifted.findIndex(x => x.name == name);
                            // console.log(index); // Testing

                            poundsLifted[index].weight += exercise.weight;
                        } else{
                            poundsLifted.push({name: exercise.name, weight:exercise.weight});
                        }
                });

                return total + weight;
            }
        }, 0);

        totals.push(workoutTotal);
    });

    console.log(poundsLifted); // Testing
    const filteredArray = poundsLifted.filter(exercise => exercise.weight >= 0);
    resistanceWorkouts = filteredArray.map(exercise => exercise.name);
    poundsLifted = filteredArray.map(exercise => exercise.weight);

    console.log(poundsLifted); // Testing
    console.log(resistanceWorkouts); // Testing

    return totals;
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
