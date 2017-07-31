import React, { Component } from 'react';
import './App.css';

const HomeLayout = require('./components/home-layout');

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeLayout />
      </div>
    );
  }
}

export default App;
