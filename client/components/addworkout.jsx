import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
export default class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalActive: false,
      editModalActive: false,
      editId: '',
      deleteId: '',
      exercise: '',
      weight: '',
      sets: '',
      reps: '',
      rest: '',
      date: new Date(),
      completed: false,
      excuse: '',
      workouts: [],
      completedDates: []
    };

    this.toggleAddModal = this.toggleAddModal.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.getDate = this.getDate.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setExercise = this.setExercise.bind(this);
    this.setWeight = this.setWeight.bind(this);
    this.setSets = this.setSets.bind(this);
    this.setReps = this.setReps.bind(this);
    this.setRest = this.setRest.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.getWorkout = this.getWorkout.bind(this);
    this.getCompleted = this.getCompleted.bind(this);
    this.getCompletedDates = this.getCompletedDates.bind(this);
    this.getEdit = this.getEdit.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.mapExercise = this.mapExercise.bind(this);
    this.showWorkout = this.showWorkout.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  componentDidMount() {
    this.getWorkout();
    this.getCompleted();
    this.getCompletedDates();
  }

  toggleAddModal() {
    this.setState({ addModalActive: !this.state.addModalActive }, () => {
      if (!this.state.addModalActive) {
        this.setState({ exercise: '' });
        this.setState({ weight: '' });
        this.setState({ sets: '' });
        this.setState({ reps: '' });
        this.setState({ rest: '' });
      }
    });
  }

  toggleEditModal() {
    this.setState({ editModalActive: !this.state.editModalActive }, () => {
      if (!this.state.editModalActive) {
        this.setState({ editId: '' });
        this.setState({ exercise: '' });
        this.setState({ weight: '' });
        this.setState({ sets: '' });
        this.setState({ reps: '' });
        this.setState({ rest: '' });
      }
    });
  }

  getDate() {
    let month = '';
    let day = '';

    if ((this.state.date.getMonth() + 1).toString().length < 2) {
      month = `0${this.state.date.getMonth() + 1}`;
    } else {
      month = this.state.date.getMonth() + 1;
    }

    if ((this.state.date.getDate()).toString().length < 2) {
      day = `0${this.state.date.getDate()}`;
    } else {
      day = this.state.date.getDate();
    }

    const date = `${month} ${day} ${this.state.date.getFullYear()}`;
    return date;
  }

  setDate(target) {
    this.setState({ date: target }, () => {
      this.getWorkout();
      this.getCompleted();
    });
  }

  setExercise(event) {
    this.setState({ exercise: event.target.value });
  }

  setWeight(event) {
    this.setState({ weight: event.target.value });
  }

  setSets(event) {
    this.setState({ sets: event.target.value });
  }

  setReps(event) {
    this.setState({ reps: event.target.value });
  }

  setRest(event) {
    this.setState({ rest: event.target.value });
  }

  handleAdd(event) {
    const data = this.state;

    fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(result => {
        this.getWorkout();
        this.toggleAddModal();
        this.setState({
          exercise: '',
          weight: '',
          sets: '',
          reps: '',
          rest: ''
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

    event.preventDefault();
  }

  handleEdit() {
    const data = this.state;

    fetch('/api/workouts/edit', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(result => {
        this.getWorkout();
        this.toggleEditModal();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    event.preventDefault();
  }

  showAddModal() {
    if (this.state.addModalActive) {
      return (
        <form onSubmit={ this.handleAdd } className="overlay">
          <div className="modal-container">
            <div className="modal-options">
              <button className="modal-button" onClick={ this.toggleAddModal }>Cancel</button>
              <p className="modal-title">New Workout</p>
              <button className="modal-button">Add</button>
            </div>
            <p className="modal-date">{ this.getDate() }</p>
            <label htmlFor="exerciseInput">Exercise Name</label>
            <input required id="exerciseInput" type="text" value={ this.state.exercise } onChange={ this.setExercise }/>
            <label htmlFor="weightInput">Weight (lbs)</label>
            <input required id="weightInput" type="number" min="0" value={ this.state.weight } onChange={ this.setWeight }/>
            <label htmlFor="setInput">Sets</label>
            <input required id="setInput" type="number" min="1" value={ this.state.sets } onChange={ this.setSets }/>
            <label htmlFor="repInput">Reps</label>
            <input required id="repInput" type="number" min="1" value={ this.state.reps } onChange={ this.setReps }/>
            <label htmlFor="restInput">Rest Time (sec)</label>
            <input required id="restInput" type="number" min="0" value={ this.state.rest } onChange={ this.setRest }/>
          </div>
        </form>
      );
    }
  }

  showEditModal() {
    if (this.state.editModalActive) {
      return (
        <form onSubmit={ this.handleEdit } className="overlay">
          <div className="modal-container">
            <div className="modal-options">
              <button className="modal-button" onClick={ this.toggleEditModal }>Cancel</button>
              <p className="modal-title">Edit Workout</p>
              <button className="modal-button">Save</button>
            </div>
            <p className="modal-date">{ this.getDate() }</p>
            <label htmlFor="exerciseInput">Exercise Name</label>
            <input required id="exerciseInput" type="text" value={ this.state.exercise } onChange={ this.setExercise }/>
            <label htmlFor="weightInput">Weight (lbs)</label>
            <input required id="weightInput" type="number" min="0" value={ this.state.weight } onChange={ this.setWeight }/>
            <label htmlFor="setInput">Sets</label>
            <input required id="setInput" type="number" min="1" value={ this.state.sets } onChange={ this.setSets }/>
            <label htmlFor="repInput">Reps</label>
            <input required id="repInput" type="number" min="1" value={ this.state.reps } onChange={ this.setReps }/>
            <label htmlFor="restInput">Rest Time (sec)</label>
            <input required id="restInput" type="number" min="0" value={ this.state.rest } onChange={ this.setRest }/>
          </div>
        </form>
      );
    }
  }

  getEdit(event) {
    this.toggleEditModal();
    const editId = event.target.getAttribute('data-edit');
    this.setState({ editId: editId }, () => {
      fetch(`/api/workouts/edit/${editId}`)
        .then(res => res.json())
        .then(workout => {
          this.setState({ exercise: workout.exercise });
          this.setState({ weight: workout.weight });
          this.setState({ sets: workout.sets });
          this.setState({ reps: workout.reps });
          this.setState({ rest: workout.rest });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }

  getWorkout() {
    const date = moment(this.state.date).format('YYYY-MM-DD');
    const formattedDate = `${date}T00:00:00Z`;

    fetch(`/api/workouts/${formattedDate}`)
      .then(res => res.json())
      .then(workout => {
        this.setState({ workouts: workout });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getCompleted() {
    const date = moment(this.state.date).format('YYYY-MM-DD');
    const formattedDate = `${date}T00:00:00Z`;

    fetch(`/api/workouts/complete/${formattedDate}`)
      .then(res => res.json())
      .then(complete => {
        if (complete.length === 0) {
          this.setState({ completed: false });
        } else if (complete[0].completed) {
          this.setState({ completed: true });
        } else {
          this.setState({ completed: false });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getCompletedDates() {
    fetch('/api/workouts/completedDates')
      .then(res => res.json())
      .then(completedDates => {
        const completeArray = completedDates;
        const tempArray = [];

        for (const data of completeArray) {
          const date = moment(data.date).format('DD-MM-YYYY');
          if (data.completed && !tempArray.includes(date)) {
            tempArray.push(date);
          }
        }
        this.setState({ completedDates: tempArray });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  deleteExercise(event) {
    const deleteId = event.target.getAttribute('data-delete');
    this.setState({ deleteId: deleteId }, () => {
      const data = this.state;

      fetch('/api/workouts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(result => {
          this.getWorkout();
        })
        .catch(error => {
          console.error('Error:', error);
        });

    });
  }

  mapExercise() {
    const contents = this.state.workouts;
    const contentItems = contents.map(content =>
      <div key={ content.workoutId}>
        <i onClick={ this.deleteExercise } data-delete={ content.workoutId } className="far fa-trash-alt"></i>
        <i onClick={ this.getEdit } data-edit={ content.workoutId } className="far fa-edit"></i>
        <p className="workout-name">{ content.exercise }</p>
        <p className="workout-detail"> { content.weight } lbs | { content.sets } Sets | { content.reps } Reps | { content.rest } Sec Rest</p>
      </div>
    );

    return contentItems;
  }

  showWorkout() {
    if (this.state.workouts.length === 0) {
      return (
        <div className="workout-container">
          <p className="workout-none">No workouts added</p>
        </div>
      );
    } else {
      return (
        <div className="workout-container">
          { this.mapExercise() }
        </div>
      );
    }
  }

  toggleComplete() {
    this.setState({ completed: !this.state.completed }, () => {
      const date = moment(this.state.date).format('YYYY-MM-DD');
      const formattedDate = `${date}T00:00:00Z`;

      const data = this.state;

      fetch(`/api/workouts/complete/${formattedDate}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(complete => {
          if (complete[0]) {
            const newDate = moment(this.state.date).format('DD-MM-YYYY');

            const tempArr = this.state.completedDates.map(x => x);
            if (complete[0].completed && !tempArr.includes(newDate)) {
              tempArr.push(newDate);
              this.setState({ completedDates: tempArr });
            }

            if (!complete[0].completed && tempArr.includes(newDate)) {
              tempArr.splice(tempArr.indexOf(newDate), 1);
              this.setState({ completedDates: tempArr });
            }
          } else {
            this.setState({ completed: !this.state.completed });
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }

  render() {
    return (
      <>
        <button onClick={ this.toggleAddModal } className="main-button">Add Workout</button>
        <button onClick={ this.toggleComplete } className="main-button">{ this.state.completed ? 'Undo' : 'Complete' }</button>
        { this.showAddModal() }
        { this.showEditModal() }
        <Calendar onChange={ this.setDate } value={this.state.date}
        tileClassName={({ date, view }) => {
          if (this.state.completedDates.find(x => x === moment(date).format('DD-MM-YYYY'))) {
            return 'complete';
          }
        }}/>
        { this.showWorkout() }
      </>
    );
  }
}
