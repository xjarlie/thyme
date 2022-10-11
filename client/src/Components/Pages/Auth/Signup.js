import React from 'react';
import withLoaderData from '../../../lib/withLoaderData.js';
import styles from "../../../css/Auth.module.css";

class Signup extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit() {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        const response = await fetch('http://localhost:4000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });
        const status = await response.status;
        const json = await response.json();
        console.log(status, json);
    }

    render() {
        return (
            <div className={styles.form}>
                <span className={styles.header}>Create Account</span>

                <div className={styles.formInput}>
                    <input type={"text"} onChange={this.handleChange} id={"nameInput"} value={this.state.name} name={"name"} placeholder={"Name"} />
                </div>
                <div className={styles.formInput}>
                    <input type={"email"} onChange={this.handleChange} id={"emailInput"} value={this.state.email} name={"email"} placeholder={"Email"} />
                </div>
                <div className={styles.formInput}>
                    <input type={"password"} onChange={this.handleChange} id={"passwordInput"} value={this.state.password} name={"password"} placeholder={"Password"} />
                </div>
                <div className={styles.formInput}>
                    <input type={"password"} onChange={this.handleChange} id={"password2Input"} value={this.state.password2} name={"password2"} placeholder={"Repeat password"} />
                </div>

                <button type={"button"} onClick={this.onSubmit} className={"primary"} >Continue</button>
            </div>
        )
    }
}


export default withLoaderData(Signup);