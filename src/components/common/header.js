import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h4>{this.props.text}</h4>
      </header>
    );
  }
}