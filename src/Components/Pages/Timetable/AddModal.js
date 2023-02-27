import React from "react";
import { closeModal } from "../../../lib/modal.js";
import modalStyles from '../../../css/Modal.module.css';
import addModalStyles from '../../../css/AddModal.module.css'
import * as Icon from 'react-feather';
import { post } from '../../../lib/fetch';
import TimeInput from "./TimeInput.js";
import DayInput from "./DayInput.js";
import ColorInput from "./ColorInput.js";
import Preview from "./Preview.js";
import { parseTime } from "../../../lib/parseTime.js";

const styles = { ...addModalStyles, ...modalStyles };

class AddModal extends React.Component {

    constructor(props) {
        super(props);

        let data = {};

        if (props.presetData) {
            let presetData = {...props.presetData};
            presetData.subject = props.subjects[presetData.subjectID].name;
            presetData.startTime = parseTime(presetData.startTime, 'string');
            presetData.endTime = parseTime(presetData.endTime, 'string');
            
            console.log(presetData);
            data = presetData;
        } else {
            data = {
                subject: '',
                startTime: '',
                endTime: '',
                room: '',
                day: '',
                color: '#000000'
            }
        }

        this.state = {
            data: data,
            filteredSubjects: []
        };

        this.props = props;

        console.log(this.state.data.startTime);

        this.handleChange = this.handleChange.bind(this);
        this.close = this.close.bind(this);
        this.handleOkay = this.handleOkay.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleSubjectBlur = this.handleSubjectBlur.bind(this);
        this.handleSubjectFocus = this.handleSubjectFocus.bind(this);
        this.handleAutocompleteClick = this.handleAutocompleteClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);

        // TODO : add preview of subject block on RHS of modal,
    }

    handleChange(e) {
        const prevData = this.state.data;
        prevData[e.target.name] = e.target.value;
        this.setState({
            data: { ...prevData }
        }, () => {
        });
    }

    handleSubjectChange(e) {

        const subjects = Object.values(this.props.subjects);

        const filtered = subjects.filter((o) => {
            return o.lowerCaseName.includes(e.target.value.toLowerCase());
        });

        this.setState({
            filteredSubjects: filtered
        });
        this.handleChange(e);
    }

    handleSubjectBlur(e) {
        setTimeout(() => {
            this.setState({
                filteredSubjects: []
            });
        }, 100)
        this.handleBlur();
    }

    handleSubjectFocus(e) {
        this.handleSubjectChange(e);
    }

    handleBlur() {
        this.validate(this.state.data);
    }

    async handleOkay() {

        const eventData = {...this.state.data};
        
        if (!this.validate(eventData)) {
            return false;
        }

        eventData.startTime = eventData.startTime.split(':')[0] + eventData.startTime.split(':')[1];
        eventData.endTime = eventData.endTime.split(':')[0] + eventData.endTime.split(':')[1];

        const { status, json } = await post('/timetable/0/events', eventData);

        console.log(status, json);

        if (status === 200) { 
            this.close();
        } else {
            alert(json?.error);
        }
    }

    validate(data) {

        let allValid = true;

        for (const i in data) {
            const value = data[i];
            const name = i;
            let currentValid = 2

            let hrs, mins;

            switch (name) {
                case 'subject':
                    currentValid = 1;
                    break;
                case 'endTime':
                    if (value === 'undefined') {
                        currentValid = 2;
                        break;
                    }

                    hrs = Number(value.split(':')[0]);
                    mins = Number(value.split(':')[1]);

                    if (hrs > 23 || mins > 59) {
                        currentValid = 0;
                        break;
                    }
                    const startTime = data.startTime || '00:00';
                    if ( (hrs < startTime.split(':')[0]) || ( hrs === Number(startTime.split(':')[0]) && mins < Number(startTime.split(':')[1]) ) ) {
                        currentValid = 0;
                        break;
                    }

                    currentValid = 1;
                    break;
                case 'startTime':
                    if (value === 'undefined') {
                        currentValid = 2;
                        break;
                    }

                    hrs = Number(value.split(':')[0]);
                    mins = Number(value.split(':')[1]);

                    if (hrs > 23 || mins > 59) {
                        currentValid = 0;
                        break;
                    }
                    currentValid = 1;
                    break;
                case 'room':
                    currentValid = 1;
                    break;
                case 'day':
                    if (value > 6 || value < 0) {
                        currentValid = 0
                    } else {
                        currentValid = 1
                    }
                    break;
                case 'color':
                    const regex = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
                    currentValid = regex.test(value) ? 1 : 0;
                    if (value === '#000000') currentValid = 2;
                    break;
            }

            if (!(value && value.length > 0)) currentValid = 2;

            const targetElement = document.querySelector(`[name="${i}"]`).parentElement;

            if (currentValid === 1) {
                targetElement.classList.remove(styles.invalid);
                targetElement.classList.add(styles.valid);
            } else if (currentValid === 0) {
                targetElement.classList.remove(styles.valid);
                targetElement.classList.add(styles.invalid);
                allValid = false;
            } else {
                targetElement.classList.remove(styles.valid);
                targetElement.classList.remove(styles.invalid);
                allValid = false;
            }
        }

        return allValid;

    }

    handleAutocompleteClick(e) {


        document.querySelector(`input#subject`).value = e.target.getAttribute('name');

        const prevData = this.state.data;
        prevData['subject'] = e.target.getAttribute('name');
        this.setState({
            filteredSubjects: [],
            data: { ...prevData }
        });
        this.handleBlur();
    }

    handleTimeChange(e) {
        this.handleChange(e);
    }

    handleDayChange(value) {
        this.handleChange({ target: { name: 'day', value: value } });
    }

    handleColorChange(value) {
        this.handleChange({ target: { name: 'color', value: value } });
    }

    close() {
        closeModal();
    }

    render() {
        return (
            <div className={styles.modal} {...this.props}>
                <div className={styles.header}>
                    <div className={styles.title}>{this.props.mode === 'edit' ? <Icon.Edit2 strokeWidth={'1.5px'} className={`icon`} /> : <Icon.Plus className={`icon`} />}{this.props.mode === 'edit' ? 'Edit class' : 'Add class'}</div>
                    <div className={styles.close} onClick={this.close}><Icon.X className={`icon ${styles.icon}`} /></div>
                </div>
                <div className={styles.body}>
                    <Preview data={this.state.data} styles={styles} />
                    <div className={`${styles.subjectWrapper} ${styles.row}`}>
                        <div className={"formInput"}>
                            <input type={"text"} name={"subject"} id={"subject"} value={this.state.data.subject} autoComplete={'off'} onFocus={this.handleSubjectFocus} onBlur={this.handleSubjectBlur} onChange={this.handleSubjectChange} placeholder="Subject" />
                        </div>
                        <div className={styles.autoWrapperWrapper}>
                            <div className={`${styles.autocompleteWrapper}`}>
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
                    </div>
                    <div className={styles.row}>
                        <div className={`formInput`}>
                            <ColorInput onChange={this.handleColorChange} onBlur={this.handleBlur} name={'color'} value={this.state.data.color} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={`formInput ${styles.timeWrapper}`}>
                            <label htmlFor="startTime">Start Time:</label>
                            <TimeInput name={'startTime'} value={this.state.data.startTime} styles={styles} onBlur={this.handleBlur} onChange={this.handleTimeChange} />
                        </div>
                        <div className={`formInput ${styles.timeWrapper}`}>
                            <label htmlFor="endTime">End Time:</label>
                            <TimeInput name={"endTime"} value={this.state.data.endTime} styles={styles} onBlur={this.handleBlur}  onChange={this.handleTimeChange} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={`formInput `}>
                            <input type={"text"} name={"room"} value={this.state.data.room} onBlur={this.handleBlur}  onChange={this.handleChange} placeholder="Room" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={`formInput`}>
                            <DayInput name={'day'} value={this.state.data.day} onChange={this.handleDayChange} />
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.action}>
                        <button type="button" className={`${styles.okayButton} primary`} onClick={this.handleOkay}>{this.props.mode === 'edit' ? 'Update subject' : 'Add subject'}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddModal;