import React from "react";
import * as Icon from 'react-feather';

class Navbar extends React.Component {

    onMenuButtonClick() {
        const sidebar = document.querySelector('.sidebar');
        const collapsed = sidebar.classList.contains('collapsed');

        if (collapsed) {
            sidebar.classList.remove('collapsed');
        } else {
            sidebar.classList.add('collapsed');
        }
    }

    render() {
        return (
            <div className="navbar">
                <div className="menuButton" onClick={this.onMenuButtonClick}>
                    <Icon.Menu className="icon" />
                </div>
                <span className="header">Thyme</span>
            </div>
        )
    }
}

export default Navbar;