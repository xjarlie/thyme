import './App.css';
import React from 'react';
import Navbar from './Components/Global/Navbar.js';
import Sidebar from './Components/Global/Sidebar.js';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <div className='main'>
          <Sidebar />
          <div className='content'></div>
        </div>
      </div>
    );
  }
}

export default App;
