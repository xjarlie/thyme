import React from "react";
import Week from "./Week";
import SuperHeader from "./SuperHeader";
import styles from "../../../css/Timetable.module.css";
import { global } from "../../../lib/global.js";
import withLoaderData from "../../../lib/withLoaderData.js";

class Timetable extends React.Component {

    render() {
        return (
            <div className={styles.timetable}>
                <SuperHeader />
                <Week loaderData={this.props.loaderData} />
            </div>
        )
    }

}

async function loader() {
    // to load:
    // user timetable ofc
    // (inc subject list)

    return await fetch(`${global.hostname}:4000/timetable/0`, {
        credentials: 'include'
    })
}

export default withLoaderData(Timetable);
export { loader };