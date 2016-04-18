import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import _ from 'underscore';
import $ from 'jquery';

class LoginApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createNewAccount: false,
      userLoginInfo: {
        emailAddress: '',
        password: '',
      },
      userCreateInfo: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',        
      },
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/signin",
      data: JSON.stringify(this.state.userLoginInfo),
      contentType: "application/json",
    })
    .done(function( msg ) { 
      window.location.href = msg.redirect;
    });
  }

  handleSignUp(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/signup",
      data: JSON.stringify(this.state.userCreateInfo),
      contentType: "application/json",
    })
    .done(function( msg ) { 
      window.location.href = msg.redirect;
    });    
  }

  goToSignUp() {
    this.setState({createNewAccount: !this.state.createNewAccount});
  }


  loginPage() {
    return (
      <div className="loginForm center-block">
        <h2>Welcome to MeetNRec</h2>
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Email Address: </label>
            <input
            onChange = {event => {
              this.setState({userLoginInfo: _.extend(this.state.userLoginInfo, {emailAddress: event.target.value})})
            }}   
            className="form-control" 
            type='email' />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
            onChange = {event => {
              this.setState({userLoginInfo: _.extend(this.state.userLoginInfo, {password: event.target.value})})
            }}   
            className="form-control" 
            type='password' />
          </div>
          <div className="form-group">
            <input type="submit" />
          </div>
        </form>
        <p>
          <a onClick={() => { this.goToSignUp()}} href="#">Create an Account</a>
        </p>
      </div>
    );
  }
  
  // Dev Note: Refactor with Map function if have time.
  signupPage() {
    return (
      <div className="loginForm center-block">
        <h2>Welcome to MeetNRec</h2>
        <h3>Create an Account</h3>
        <form onSubmit={this.handleSignUp.bind(this)}>
          <div className="form-group">
            <label>First Name: </label>
            <input
            onChange = {event => {
              this.setState({userCreateInfo: _.extend(this.state.userCreateInfo, {firstName: event.target.value})})
            }}
            className="form-control" 
            type='text' />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
            onChange = {event => {
              this.setState({userCreateInfo: _.extend(this.state.userCreateInfo, {lastName: event.target.value})})
            }}            
            className="form-control" 
            type='text' />
          </div>
          <div className="form-group">
            <label>Email Address: </label>
            <input
            onChange = {event => {
              this.setState({userCreateInfo: _.extend(this.state.userCreateInfo, {emailAddress: event.target.value})})
            }}   
            className="form-control" 
            type='email' />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
            onChange = {event => {
              this.setState({userCreateInfo: _.extend(this.state.userCreateInfo, {password: event.target.value})})
            }}   
            className="form-control" 
            type='password' />
          </div>
          <div className="form-group">
            <input type="submit" />
          </div>
        </form>
        <p>
          <a onClick={() => { this.goToSignUp()}} href="#">Back to Login Screen</a>
        </p>
      </div>
    );
  }

  render() {
    return (this.state.createNewAccount ? this.signupPage() : this.loginPage());
  }
}

ReactDOM.render(<LoginApp />, document.querySelector('.container'));

