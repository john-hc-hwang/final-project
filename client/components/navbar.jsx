import React from 'react';
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="navbar">
        <div className="row">
          <i className="fas fa-align-justify"></i>
          <div className="container">
            <h2 className="main-heading">Liftrack</h2>
          </div>
          <i className="far fa-user"></i>
        </div>
      </header>
    );
  }
}
