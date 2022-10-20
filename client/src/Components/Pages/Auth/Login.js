import React from "react";
import styles from "../../../css/Auth.module.css";
import * as Icon from 'react-feather';
import { Link } from "react-router-dom";

class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit() {
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        const response = await fetch('http://localhost:4000/auth/login', {
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

        if (status === 200) {
            window.location.reload();
        } else {
            alert('Login information incorrect');
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    togglePassword(e) {
        const passwordInput = e.target.parentElement.querySelector('.passwordInput');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    }

    render() {
        return (
            <div className={styles.form}>

                <span className={styles.header}>Log In</span>

                <div className={styles.formInput}>
                    <input type={"email"} id={"email"} value={this.state.email} name="email" onChange={this.handleChange} placeholder={"Email"} />
                </div>

                <div className={styles.formInput}>
                    <input type={"password"} id={"password"} className="passwordInput" value={this.state.password} name="password" onChange={this.handleChange} placeholder={"Password"} />
                    <button type='button' onClick={this.togglePassword} id={'showPassword'} className={styles.showPassword}>
                        <Icon.Eye className={styles.icon} />
                    </button>
                    
                </div>

                <button type="button" onClick={this.onSubmit} className={"primary"}>Continue</button>

                <Link className={styles.belowText} to={"/auth/signup"}>Don't have an account yet? Click <u>here</u></Link>
            </div>
        )
    }
}

export default Login;