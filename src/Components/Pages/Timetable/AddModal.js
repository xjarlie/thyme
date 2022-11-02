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
            data: {
                subject: '',
                startTime: '',
                endTime: '',
                room: '',
                day: ''
            },
            props: props,
            filteredSubjects: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.close = this.close.bind(this);
        this.handleOkay = this.handleOkay.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleAutocompleteClick = this.handleAutocompleteClick.bind(this);
    }

    handleChange(e) {
        const prevData = this.state.data;
        prevData[e.target.name] = e.target.value;
        this.setState({
            data: {...prevData}
        });
        console.log('STATE', this.state);
    }

    handleSubjectChange(e) {

        const subjects = this.props.data.result.timetable?.subjects;

        const filtered = subjects.filter((o) => {
            return o.lowerCaseName.includes(e.target.value.toLowerCase());
        });

        this.setState({
            filteredSubjects: filtered
        });
        this.handleChange(e);
    }

    async handleOkay() {

        const eventData = this.state.data;
        console.log(eventData);

        const { status, json } = await post('/timetable/0/events', eventData);

        console.log(status, json);

        this.close();
    }

    handleAutocompleteClick(e) {

        document.querySelector(`input#subject`).value = e.target.getAttribute('name');

        const prevData = this.state.data;
        prevData['subject'] = e.target.getAttribute('name');
        this.setState({
            filteredSubjects: [],
            data: {...prevData}
        });
        console.log(this.state.data);
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
                            <input type={"text"} name={"subject"} id={"subject"} value={this.state.subject} onChange={this.handleSubjectChange} placeholder="Subject" />
                        </div>
                        <div className={styles.autocompleteWrapper}>
                            {
                                this.state.filteredSubjects.map((subject) => {
                                    return (
                                        <div className={styles.subjectAutocomplete} name={subject.name} key={subject.name} onClick={this.handleAutocompleteClick}>
                                            {subject.name}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"startTime"} value={this.state.startTime} onChange={this.handleChange} placeholder="Start time" />
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"endTime"} value={this.state.endTime} onChange={this.handleChange} placeholder="End time" />
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"room"} value={this.state.room} onChange={this.handleChange} placeholder="Room" />
                    </div>
                    <div className={"formInput"}>
                        <input type={"text"} name={"day"} value={this.state.day} onChange={this.handleChange} placeholder="Day" />
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