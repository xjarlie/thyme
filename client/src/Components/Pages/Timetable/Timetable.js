import React from "react";
import Week from "./Week";
import "../../../css/Timetable.css"

class Timetable extends React.Component {

    render() {
        return (
            <div className="timetable">
                <Week />
            </div>
        )
    }

}

export default Timetable;