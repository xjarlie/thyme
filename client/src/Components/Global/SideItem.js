import React from "react";
import { NavLink } from 'react-router-dom';

class Sideitem extends React.Component {

    onLinkClick() {
        const sidebar = document.querySelector('.sidebar');
        
        if (window.getComputedStyle(sidebar).position === 'absolute') {
            sidebar.classList.add('collapsed');
        }
    }

    render() {
        return (
            <NavLink to={`/${this.props.name.toLowerCase()}`} className={`sideitem ${this.props.active ? 'active' : ''}`} id={`sidenav-${this.props.name.toLowerCase()}`} onClick={this.onLinkClick} >
                <span className="iconspan"><this.props.icon className="icon" /></span>
                <span className="textspan">{this.props.name}</span>
            </NavLink>
        )
    }
}

export default Sideitem;