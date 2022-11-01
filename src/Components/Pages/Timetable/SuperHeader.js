import React from "react";
import styles from '../../../css/Timetable.module.css';
import * as Icon from 'react-feather';
import { createModal } from "../../../lib/modal.js";
import AddModal from "./AddModal";

class SuperHeader extends React.Component {

    constructor(props) {
        super(props);

        this.addClassBtnClick = this.addClassBtnClick.bind(this);
    }

    addClassBtnClick() {
        createModal(AddModal, this.props.loaderData);
    }

    render() {
        return (
            <div className={styles.superHeader}>
                <div className={`${styles.dividerLeft} ${styles.divider}`}></div>
                <div className={`${styles.dividerCenter} ${styles.divider}`}>
                    <div className={styles.weekNumber}>{'<'} Week 1 &gt;</div>
                </div>
                <div className={`${styles.dividerRight} ${styles.divider}`}>
                    <button className={styles.addButton} onClick={this.addClassBtnClick} ><Icon.Plus className={`icon ${styles.icon}`} /></button>
                </div>

            </div>
        )
    }
}

export default SuperHeader;