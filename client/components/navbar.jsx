import React from 'react';
export default class NavBar extends React.Component {
  // Useless constructor eslint --fix
  // constructor(props) {
  //   super(props);
  // }

  // add below tab when there are multiple pages to show
  // tab
  // <i className="fas fa-align-justify"></i> //

  // add below user when user registration and sign in is implemented
  // user
  // <i className="far fa-user"></i>

  render() {
    return (
      <header className="navbar">
        <div className="row">
          <div className="container">
            <h2 className="main-heading">Liftrack</h2>
          </div>
        </div>
      </header>
    );
  }
}
