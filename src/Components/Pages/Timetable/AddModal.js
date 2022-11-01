import React from "react";
import { closeModal } from "../../../lib/modal.js";
import modalStyles from '../../../css/Modal.module.css';
import addModalStyles from '../../../css/AddModal.module.css'
import * as Icon from 'react-feather';
import { post } from '../../../lib/fetch';

const styles = { ...addModalStyles, ...modalStyles };

class AddModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            props: props,
            filteredSubjects: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.close = this.close.bind(this);
        this.handleOkay = this.handleOkay.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
    }

    handleChange(e) {
        const prevData = this.state.data;
        prevData[e.target.name] = e.target.value;
        this.setState({
            data: prevData
        });
    }

    handleSubjectChange(e) {

        const subjects = this.props.data.result.timetable?.subjects;

        const filtered = subjects.filter((o) => {
            return o.lowerCaseName.includes(e.target.value.toLowerCase());
        });

        const prevData = this.state.data;
        prevData[e.target.name] = e.target.value;
        this.setState({
            filteredSubjects: filtered,
            data: prevData
        });
        console.log(this.state.filteredSubjects);
    }

    async handleOkay() {

        const eventData = this.state.data;
        console.log(eventData);

        const { status, json } = await post('/timetable/0/events', eventData);

        console.log(status, json);

        this.close();
    }

    close() {
        closeModal();
    }

    render() {
        return (

            <div className={styles.modal} {...this.state.props}>
                <div className={styles.header}>
                    <div className={styles.title}>+ Add class</div>
                    <div className={styles.close} onClick={this.close}><Icon.X className={`icon ${styles.icon}`} /></div>
                </div>
                <div className={styles.body}>
                    <div className={styles.subjectWrapper}>
                        <div className={"formInput"}>
                            <input type={"text"} name={"subject"} value={this.state.text} onChange={this.handleSubjectChange} placeholder="Subject" />
                        </div>
                        <div className={styles.autocompleteWrapper}>
                            {
                                this.state.filteredSubjects.map((subject) => {
                                    return (
                                        <div className={styles.subjectAutocomplete} key={subject.name}>
                                            {subject.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"startTime"} value={this.state.text} onChange={this.handleChange} placeholder="Start time" />
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"endTime"} value={this.state.text} onChange={this.handleChange} placeholder="End time" />
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"room"} value={this.state.text} onChange={this.handleChange} placeholder="Room" />
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"day"} value={this.state.text} onChange={this.handleChange} placeholder="Day" />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.action}>
                        <button type="button" className={`${styles.okayButton} primary`} onClick={this.handleOkay}>Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddModal;