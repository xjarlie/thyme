import React from "react";
import * as Icon from 'react-feather';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar collapsed">
                <div className="sideitem active" id="sidenav-dashboard">
                    <Icon.Activity className="icon" />
                    <span>Dashboard</span>
                </div>
                <div className="sideitem" id="sidenav-timetable">
                    <Icon.Calendar className="icon" />
                    <span>Timetable</span>
                </div>
                <div className="sideitem" id="sidenav-tasks">
                    <Icon.CheckSquare className="icon" />
                    <span>Tasks</span>
                </div>
                <div className="sideitem" id="sidenav-notes">
                    <Icon.Edit3 className="icon" />
                    <span>Notes</span>
                </div>
            </div>
        )
    }
}

export default Sidebar;