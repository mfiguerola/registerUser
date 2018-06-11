import React, { Component } from 'react';
import './icon.scss';

export default class Icon extends Component {
  render() {
    return (
      <header className="header primary-text">
        <h4 className="text-center">{this.props.text}</h4>
      </header>
    );
  }
}