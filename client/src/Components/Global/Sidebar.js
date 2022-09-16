import React from "react";
import * as Icon from 'react-feather';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <div className="sideitem" id="sidenav-dashboard">
                    <Icon.Activity />
                    
                </div>
            </div>
        )
    }
}

export default Sidebar;