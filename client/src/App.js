import styles from './css/App.module.css';
import { global } from './lib/global.js';

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

async function loader() {

  global.hostname = `${window.location.protocol}//${window.location.hostname}`;

  const response = await fetch(`${global.hostname}:4000/auth/checktoken`, {
    method: 'GET',
    credentials: 'include'
  });

  if ((await response.json()).result === false) {
    throw new Error('wasd');
  }
}

export default App;
export { loader };
