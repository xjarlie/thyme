import React from "react";
import * as Icon from 'react-feather';
import styles from "../../css/Navbar.module.css";
import sidebarStyles from "../../css/Sidebar.module.css";

class Navbar extends React.Component {

    onMenuButtonClick() {
        const sidebar = document.querySelector(`.${sidebarStyles.sidebar}`);
        sidebar.classList.toggle(sidebarStyles.collapsed);
    }

    render() {
        return (
            <div className={styles.navbar}>
                <button className={styles.menuButton} onClick={this.onMenuButtonClick} style={{display: (this.props.menu === true ? "block" : "none" )}}>
                    <Icon.Menu className={styles.icon} />
                </button>
                <span className={styles.header}>Thyme</span>
            </div>
        )
    }
}

export default Navbar;