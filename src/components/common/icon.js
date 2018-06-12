import React, { Component } from 'react';
import back from '../../icons/back.svg';
import circle from '../../icons/circle.svg';
import close from '../../icons/close.svg';
import tick from '../../icons/tick_circle.svg';
import './icon.scss';

const icons = {
  back, circle, close, tick
};

export default class Icon extends Component {
  render() {
    let html = '';
    if (!this.props.hasToHideIcon) {
      html = (
        <img src={icons[this.props.type]} className={"icon-" + this.props.size} alt={this.props.type} />
      )
    };
    return html;
  }
}