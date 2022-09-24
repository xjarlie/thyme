import styles from './css/App.module.css';

import React from 'react';
import Navbar from './Components/Global/Navbar.js';
import Sidebar from './Components/Global/Sidebar.js';
import { Outlet } from 'react-router-dom';

class App extends React.Component {
  render() {
    console.log(styles)
    return (
      <div className={"app"}>
        <Navbar menu={true} />
        <div className={styles.main}>
          <Sidebar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
