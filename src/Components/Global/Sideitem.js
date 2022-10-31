import React from "react";
import { NavLink } from 'react-router-dom';
import styles from "../../css/Sidebar.module.css";

class Sideitem extends React.Component {

    onLinkClick() {
        const sidebar = document.querySelector(`.${styles.sidebar}`);
        if (window.getComputedStyle(sidebar).position === 'absolute') {
            sidebar.classList.add(styles.collapsed);
        }
    }

    render() {
        return (
            <NavLink to={`${this.props.name.toLowerCase()}`} className={({ isActive  }) => isActive ? `${styles.sideitem} ${styles.active}` : styles.sideitem} id={`sidenav-${this.props.name.toLowerCase()}`} onClick={this.onLinkClick} >
                <span className={styles.iconspan}><this.props.icon className={styles.icon} /></span>
                <span className={styles.textspan}>{this.props.name}</span>
            </NavLink>
        )
    }
}

export default Sideitem;