import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './register.css';
import Header from '../common/header';

export default class RegisterForm extends Component {
  render() {
    return (
      <div className="register-form">
        <Header text="TODO"></Header>{/* TODO: Header content is home page user type selection */}
        <Button color="light">{this.props.text}</Button>
      </div>
    );
  }
}