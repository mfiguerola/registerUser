import React, { Component } from 'react';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className="header primary-text">
        <h4 className="text-center">{this.props.text}</h4>
      </header>
    );
  }
}