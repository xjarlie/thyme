import React from "react";
import * as Icon from 'react-feather';

class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <div className="menuButton">
                    <Icon.Menu className="icon" />
                </div>
                <span className="header">Thyme</span>
            </div>
        )
    }
}

export default Navbar;