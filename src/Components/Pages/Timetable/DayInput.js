import React from "react";
import styles from '../../../css/DayInput.module.css';

class DayInput extends React.Component {
    constructor(props) {
        super();

        this.props = props;
        console.log(props);
        this.handleChange = this.props.onChange;
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleOptionClick(e) {
        const element = e.target;
        const value = element.dataset.value;

        // if (!(this.props.value === -1)) {
        //     document.querySelector(`div[data-value="${this.state.value}"]`).classList.remove(styles.selected);
        // }

        element.classList.add(styles.selected);
        this.handleChange(value);
    }

    handleSelectChange(e) {
        this.handleChange(e.target.value);
    }

    render() {


        return (

            <div className={styles.inputWrapper} name={this.props.name}>
                <div className={styles.desktopSelect} role={'select'}>
                    <div className={`${styles.option} ${this.props.value === '0'? styles.selected : ''}`} onClick={this.handleOptionClick} name='mon' data-value={0} role='option'>Mon</div>
                    <div className={`${styles.option} ${this.props.value === '1'? styles.selected : ''}`} onClick={this.handleOptionClick} name='tue' data-value={1} role='option'>Tue</div>
                    <div className={`${styles.option} ${this.props.value === '2'? styles.selected : ''}`} onClick={this.handleOptionClick} name='wed' data-value={2} role='option'>Wed</div>
                    <div className={`${styles.option} ${this.props.value === '3'? styles.selected : ''}`} onClick={this.handleOptionClick} name='thu' data-value={3} role='option'>Thu</div>
                    <div className={`${styles.option} ${this.props.value === '4'? styles.selected : ''}`} onClick={this.handleOptionClick} name='fri' data-value={4} role='option'>Fri</div>
                    <div className={`${styles.option} ${this.props.value === '5'? styles.selected : ''}`} onClick={this.handleOptionClick} name='sat' data-value={5} role='option'>Sat</div>
                    <div className={`${styles.option} ${this.props.value === '6'? styles.selected : ''}`} onClick={this.handleOptionClick} name='sun' data-value={6} role='option'>Sun</div>
                </div>
                <div className={styles.mobileSelect}>
                    <label htmlFor="day">Day: </label>
                    <select name="day" value={this.props.value} onChange={this.handleSelectChange}>
                        <option value={0}>Monday</option>
                        <option value={1}>Tuesday</option>
                        <option value={2}>Wednesday</option>
                        <option value={3}>Thursday</option>
                        <option value={4}>Friday</option>
                        <option value={5}>Saturday</option>
                        <option value={6}>Sunday</option>
                    </select>
                </div>
            </div>

        )

    }
}

export default DayInput;