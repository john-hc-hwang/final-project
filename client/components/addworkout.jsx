import React from 'react';
import Calendar from 'react-calendar';
export default class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addModalActive: false,
      exercise: '',
      weight: '',
      sets: '',
      reps: '',
      rest: '',
      date: new Date(),
      completed: false,
      excuse: ''
    };

    this.setDate = this.setDate.bind(this);
    this.getDate = this.getDate.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.setExercise = this.setExercise.bind(this);
    this.setWeight = this.setWeight.bind(this);
    this.setSets = this.setSets.bind(this);
    this.setReps = this.setReps.bind(this);
    this.setRest = this.setRest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  setDate(target) {
    this.setState({ date: target });
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

  toggleState() {
    this.setState({ addModalActive: !this.state.addModalActive });
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

  handleSubmit(event) {
    const data = this.state;

    fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(workout => {
        // console.log(workout);
        // console.log(workout.date);
        // 2021-07-24T00:00:00Z
      })
      .catch(error => {
        console.error('Error:', error);
      });

    this.setState({
      exercise: '',
      weight: '',
      sets: '',
      reps: '',
      rest: ''
    });

    event.preventDefault();
  }

  showModal() {
    if (this.state.addModalActive) {
      return (
        <form onSubmit={ this.handleSubmit } className="overlay">
          <div className="modal-container">
            <div className="modal-options">
              <button className="modal-button" onClick={ this.toggleState }>Cancel</button>
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

  render() {
    return (
      <>
        <button onClick={ this.toggleState } className="main-button">Add Workout</button>
        { this.showModal() }
        <Calendar onChange={this.setDate} value={this.state.date} />
      </>
    );
  }
}
