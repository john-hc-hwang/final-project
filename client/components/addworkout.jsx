import React from 'react';
export default class AddWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AddModalActive: false
    };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState() {
    this.setState({ AddModalActive: !this.state.AddModalActive });
  }

  render() {
    console.log(this.state.AddModalActive);
    return (
      <>
        <button onClick={ this.toggleState } className="main-button">Add Workout</button>
      </>
    );
  }
}
