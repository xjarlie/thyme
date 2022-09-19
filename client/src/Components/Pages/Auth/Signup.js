import React from 'react';

class Signup extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        console.log('cookies:', document.cookie);
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
            <div>
                <input type={"text"} onChange={this.handleChange} id={"nameInput"} value={this.state.name} name={"name"} />
                <input type={"email"} onChange={this.handleChange} id={"emailInput"} value={this.state.email} name={"email"} />
                <input type={"password"} onChange={this.handleChange} id={"passwordInput"} value={this.state.password} name={"password"} />
                <button type={"button"} onClick={this.onSubmit}>Submit</button>
            </div>
        )
    }
}

export default Signup;