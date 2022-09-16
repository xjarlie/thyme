import './App.css';
import React from 'react';
import Navbar from './Components/Global/Navbar.js';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar />
      </div>
    );
  }
}

export default App;
