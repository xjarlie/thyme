import styles from './css/App.module.css';
import { global } from './lib/global.js';

import React from 'react';
import Navbar from './Components/Global/Navbar.js';
import Sidebar from './Components/Global/Sidebar.js';
import { Outlet } from 'react-router-dom';
import { useRouteError, json, Navigate } from 'react-router-dom';

class App extends React.Component {
  render() {
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

  console.log('appload');

  const response = await fetch(`${global.serverAddr}/auth/checktoken`, {
    method: 'GET',
    credentials: 'include'
  });

  if ((await response.json()).result === false) {
    console.log('apploadfailed')
    throw json({ type: 'auth' })
  }
}

function ErrorElement() {
  let error = useRouteError();

  if (error.data.type === 'auth') {
    return <Navigate to={"/auth/login"} />
  } else {
    return <div>{JSON.stringify(error)}</div>
  }
}

export default App;
export { loader, ErrorElement };
