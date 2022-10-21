import React from "react";
import styles from '../../../css/Timetable.module.css';
import * as Icon from 'react-feather';
import { createModal, closeModal } from "../../../lib/modal.js";
import modalStyles from '../../../css/Modal.module.css';

class SuperHeader extends React.Component {

    addClassBtnClick() {


        class AddModal extends React.Component {

            constructor() {
                super();

                this.state = {
                    text: ''
                };
                this.handleChange = this.handleChange.bind(this);
                this.close = this.close.bind(this);
                this.handleOkay = this.handleOkay.bind(this);
            }

            handleChange(e) {
                this.setState({
                    [e.target.name]: e.target.value
                });
            }

            async handleOkay() {
                console.log(this.state.text);
                this.close();
            }

            close() {
                closeModal();
            }

            render() {
                return (
                    <div className={modalStyles.modal}>
                        <div className={modalStyles.header}>
                            <div className={modalStyles.title}>+ Add class</div>
                            <div className={modalStyles.close} onClick={this.close}><Icon.X className={`icon ${modalStyles.icon}`} /></div>
                        </div>
                        <div className={modalStyles.body}>
                            <div className={"formInput"}>
                                <input type={"text"} name={"text"} value={this.state.text} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className={modalStyles.footer}>
                            <div className={modalStyles.action}>
                                <button type="button" onClick={this.handleOkay}>Continue</button>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        createModal(AddModal);
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