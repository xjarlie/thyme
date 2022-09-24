import React from "react";
import * as Icon from 'react-feather';
import Sideitem from "./Sideitem";
import styles from "../../css/Sidebar.module.css";

class Sidebar extends React.Component {
    render() {
        return (
            <div className={`${styles.sidebar}`}>
                <Sideitem name="Dashboard" icon={Icon.Activity} />
                <Sideitem name="Timetable" icon={Icon.Calendar} />
                <Sideitem name="Tasks" icon={Icon.CheckSquare} />
                <Sideitem name="Notes" icon={Icon.Edit3} />
            </div>
        )
    }
}

export default Sidebar;