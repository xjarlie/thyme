import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Global/Navbar.js";
import styles from "../../../css/Auth.module.css";
import { global } from "../../../lib/global.js";
import { useRouteError, json, Navigate } from "react-router-dom";
import { get } from "../../../lib/fetch.js";

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

    const {status} = await get('/auth/checktoken');
    console.log(status);
    if (status !== 403) {
        console.log('authloadfailed');
        throw json({type: 'auth'})
    } else {
        console.log('authloadsuccess')
    }
}

function ErrorElement() {
    let error = useRouteError();

    console.log(error);

    if (error.data?.type === 'auth') {
        return <Navigate to={"/app"} />
    } else {
        return <div>Error: {JSON.stringify(error)}</div>
    }

}

export default Auth;
export { loader, ErrorElement };