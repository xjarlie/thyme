import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Global/Navbar.js";
import styles from "../../../css/Auth.module.css";
import { global } from "../../../lib/global.js";
import { useRouteError, json, Navigate } from "react-router-dom";

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

    console.log('authload');

    const response = await fetch(`${global.serverAddr}/auth/checktoken`, {
        method: 'GET',
        credentials: 'include'
    });

    if ((await response.json()).result === true) {
        console.log('authloadfailed');
        throw json({type: 'auth'})
    } else {
        console.log('authloadsuccess')
    }
}

function ErrorElement() {
    let error = useRouteError();

    console.log(error);

    if (error.data.type === 'auth') {
        return <Navigate to={"/"} />
    } else {
        return <div>{JSON.stringify(error)}</div>
    }

}

export default Auth;
export { loader, ErrorElement };