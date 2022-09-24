import React from "react";
import Week from "./Week";
import styles from "../../../css/Timetable.module.css"

class Timetable extends React.Component {

    render() {
        return (
            <div className={styles.timetable}>
                <Week />
            </div>
        )
    }

}

export default Timetable;