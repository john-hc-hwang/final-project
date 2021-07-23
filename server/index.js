require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

// example below
// endpoint

// app.get('/api/workout', (req, res) => {

// someId needs to be sent back with data ITS A MUST
//   const sql = `
//     select
//       "someId"
//       "columnName1",
//       "columnName2",
//       "columnName3"
//     from "tableName"
//     join "tableName" using ("someId");
//   `;

//   db.query(sql)
//     .then(result => {
//       const workouts = result.rows;
//       res.json(workouts);
//     });
// });

// jsx exmaple below
// frontend method

// getTodos() {
//   fetch('api/workout')
//     .then(res => res.json())
//     .then(workouts => {
//       this.setState({ stateName: workouts })
// workouts is an array (result.rows)
//     });
// }

// render return example
// render() {
//   const { workouts } = this.state;

//   return (
//     <ul>
//       {
//         workouts.map(workout => (
//           <li key={workout.workoutId}>
//             <h5>{ workout.name }</h5>
//             <p>{ workout.details }</p>
//             <p>{ workout.columnName }</p>
//           </li>
//         ))
//       }
//     </ul>
//   )
// }
// Note end

app.post('/api/workouts', (req, res, next) => {
  const sql = `
    insert into "workouts" ("userId", "exercise", "weight", "sets", "reps", "rest", "date", "completed", "excuse")
    values (1, $1, $2, $3, $4, $5, $6, $7, $8)
    returning "workoutId", "exercise", "weight", "sets", "reps", "rest", "date", "completed", "excuse"
  `;

  const { exercise, weight, sets, reps, rest, date, completed, excuse } = req.body;

  const params = [exercise, weight, sets, reps, rest, date, completed, excuse];

  db.query(sql, params)
    .then(result => {
      const [newWorkout] = result.rows;
      res.status(201).json(newWorkout);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
