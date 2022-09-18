import React from "react";
import * as Icon from 'react-feather';

class Navbar extends React.Component {

    onMenuButtonClick() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
    }

    render() {
        return (
            <div className="navbar">
                <button className="menuButton" onClick={this.onMenuButtonClick}>
                    <Icon.Menu className="icon" />
                </button>
                <span className="header">Thyme</span>
            </div>
        )
    }
}

export default Navbar;