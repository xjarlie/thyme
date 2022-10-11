import React from "react";
import styles from "../../../css/Auth.module.css";

class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            email: 'wasd',
            password: 'wasd'
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
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className={styles.form}>
                <input type={"email"} id={"email"} value={this.state.email} onChange={this.handleChange} />
                <input type={"password"} id={"password"} value={this.state.password} onChange={this.handleChange} />
                <button type="button" onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

export default Login;