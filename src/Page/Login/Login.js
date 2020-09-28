import React, { Component } from 'react';
import NavBar from '../../Components/Navbar/NavBar';
import './Login.css';
import firebase from '../../Firebase';


export default class Login extends Component {

    state = {
        new: false,
        email: '',
        password: ''
    }

    onClick = () => {
        this.setState({ new: !this.state.new })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const user = this.state;

        if (this.state.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (this.state.password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
            this.props.history.push('/');
            localStorage.setItem('login','logado')
        })
        .catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode)
            if (errorCode === 'auth/user-not-found') {
                alert('The email is wrong.');
                return
            }
            if (errorCode === 'auth/wrong-password') {
                alert('The password is wrong.');
                return
            } 
        });
    }

    onSubmitCreate = (event) => {
        event.preventDefault();

        const user = this.state;

        if (this.state.email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (this.state.password.length < 4) {
            alert('Please enter a password.');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function (error) {

            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
                return
            } else {
                alert(errorMessage)
                return
            }
        });
        alert("Create with Success");
        this.clean();
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    clean = () => {
        this.setState({
            email: '',
            password: ''
        })
    }



    render() {

        if (this.state.new === true) {
            return (<section className="media">
                <NavBar></NavBar>
                <div className="section-login">
                    <form className="login-form" onSubmit={this.onSubmitCreate}>
                        <h1 style={{ color: 'white', textAlign: 'center' }}>Create a user</h1>
                        <div className="login-form-input">
                            <span>E-mail</span>
                            <input name="email" type="email" onChange={this.onChange} value={this.state.email}></input>
                        </div>
                        <div className="login-form-input">
                            <span>Password</span>
                            <input name="password" type="password" onChange={this.onChange} value={this.state.password}></input>
                        </div>
                        <div className="login-form-input">
                            <button type="submit">Submit</button>
                        </div>
                        <div className="login-form-input">
                            <a onClick={this.onClick}>Back</a>
                        </div>
                    </form>
                </div>
                <footer>
                    <div className="footer">
                        <span>2020, made by <a>Leandro Cavalcanti</a></span>
                    </div>
                </footer>
            </section>)
        } else {
            return (
                <section className="media">
                    <NavBar></NavBar>
                    <div className="section-login">
                        <form className="login-form" onSubmit={this.onSubmit}>
                            <h1 style={{ color: 'white', textAlign: 'center' }}>Login</h1>
                            <div className="login-form-input">
                                <span>E-mail</span>
                                <input name="email" type="email" onChange={this.onChange}></input>
                            </div>
                            <div className="login-form-input">
                                <span>Password</span>
                                <input name="password" type="password" onChange={this.onChange}></input>
                            </div>
                            <div className="login-form-input">
                                <button type="submit">Submit</button>
                            </div>
                            <div className="login-form-input">
                                <a onClick={this.onClick}>Create a new user</a>
                            </div>

                        </form>
                    </div>
                    <footer>
                        <div className="footer">
                            <span>2020, made by <a>Leandro Cavalcanti</a></span>
                        </div>
                    </footer>
                </section>
            )
        }
    }
}

