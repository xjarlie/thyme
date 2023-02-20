import React from "react";
import styles from '../../../css/DayInput.module.css';

class DayInput extends React.Component {
    constructor(props) {
        super();

        this.state = {
            value: -1,
        }

        this.props = props;
        this.handleChange = this.props.onChange;
        this.handleOptionClick = this.handleOptionClick.bind(this);
    }

    handleOptionClick(e) {
        const element = e.target;
        const value = element.dataset.value;

        if (!(this.state.value === -1)) {
            document.querySelector(`div[data-value="${this.state.value}"]`).classList.remove(styles.selected);
        }

        element.classList.add(styles.selected);
        this.setState({
            value: value
        }, () => {
            this.handleChange(value)
        });
    }

    render() {

        return (

            <div className={styles.inputWrapper} name={this.props.name}>
                <div className={styles.desktopSelect}>
                    <div className={styles.option} onClick={this.handleOptionClick} name='mon' data-value={0} role='button'>Mon</div>
                    <div className={styles.option} onClick={this.handleOptionClick} name='tue' data-value={1} role='button'>Tue</div>
                    <div className={styles.option} onClick={this.handleOptionClick} name='wed' data-value={2} role='button'>Wed</div>
                    <div className={styles.option} onClick={this.handleOptionClick} name='thu' data-value={3} role='button'>Thu</div>
                    <div className={styles.option} onClick={this.handleOptionClick} name='fri' data-value={4} role='button'>Fri</div>
                    <div className={styles.option} onClick={this.handleOptionClick} name='sat' data-value={5} role='button'>Sat</div>
                    <div className={styles.option} onClick={this.handleOptionClick} name='sun' data-value={6} role='button'>Sun</div>
                </div>
                <div className={styles.mobileSelect}></div>
            </div>

        )

    }
}

export default DayInput;