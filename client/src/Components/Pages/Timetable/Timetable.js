import React from "react";
import Week from "./Week";
import SuperHeader from "./SuperHeader";
import styles from "../../../css/Timetable.module.css"

class Timetable extends React.Component {

    render() {
        return (
            <div className={styles.timetable}>
                <SuperHeader />
                <Week />
            </div>
        )
    }

}

export default Timetable;