import React, { Component } from 'react';
import close from '../../icons/close.svg';
import back from '../../icons/back.svg';
import tick from '../../icons/tick_circle.svg';
// import './icon.scss';

const icons = {
  close, back, tick
};

export default class Icon extends Component {
  render() {
    let html = '';
    if (this.props.hasToShowIcon) {
      html = (
        <img src={icons[this.props.type]} className="App-logo" alt={this.props.type} />
      )
    };
    return html;
  }
}