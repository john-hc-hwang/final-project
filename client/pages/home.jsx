import React from 'react';
import NavBar from '../components/navbar';
import AddWorkout from '../components/addworkout';
import Dates from '../components/dates';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <NavBar />
        <AddWorkout />
        <Dates />
      </>
    );
  }
}
