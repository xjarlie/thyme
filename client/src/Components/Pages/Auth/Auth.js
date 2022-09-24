import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Global/Navbar.js";
import styles from "../../../css/Auth.module.css";

class Auth extends React.Component {
    render() {
        return (
            <div className={"app"}>
                <Navbar menu={false} />
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        )
    }
}


async function loader() {
    const response = await fetch('http://localhost:4000/auth/checktoken', {
        method: 'GET',
        credentials: 'include'
    });

    if ((await response.json()).result === true) {
        throw new Error('wasd');
    }
}

export default Auth;
export { loader };