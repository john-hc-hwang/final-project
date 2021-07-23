import React from 'react';
import NavBar from '../components/navbar';
import AddWorkout from '../components/addworkout';
export default class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <NavBar />
        <AddWorkout />
      </>
    );
  }
}
