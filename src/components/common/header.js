import React, { Component } from 'react';
import './header.scss';
import Icon from '../common/icon';
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    let backBtnHtml = '';
    if (this.props.hasBackButton) {
      backBtnHtml = (
        <div className="back-container">
          <Link key='register' to={{
            pathname: '/home',
            hash: this.props.userType
          }}>
            <Icon type="back" size='md' />
          </Link>
        </div>
      );
    }
    return (
      <header className="header primary-text">
        <h4 className="text-center">{this.props.text}</h4>
        <div className="close-container">
          <a href="http://group.hotelbeds.com/brand/roiback">
            <Icon type="close" size='md' />
          </a>
        </div>  
        {backBtnHtml}
      </header>
    );
  }
}