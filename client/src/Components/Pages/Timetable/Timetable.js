import React from "react";
import Week from "./Week";
import SuperHeader from "./SuperHeader";
import styles from "../../../css/Timetable.module.css";
import withLoaderData from "../../../lib/withLoaderData.js";
import { get } from "../../../lib/fetch.js";

class Timetable extends React.Component {

    render() {
        return (
            <div className={styles.timetable}>
                <SuperHeader />
                <Week loaderData={this.props.loaderData} weekNum={0} />
            </div>
        )
    }

}

async function loader() {
    // to load:
    // user timetable ofc
    // (inc subject list)

    return (await get('/timetable/0')).json;
}

export default withLoaderData(Timetable);
export { loader };