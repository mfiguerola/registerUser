import React, { Component } from 'react';
import Icon from '../common/icon';
import { Link } from "react-router-dom";
import './header.scss';

export default class Header extends Component {
  render() {
    let backBtnHtml = '';
    if (this.props.hasBackButton) {
      backBtnHtml = (
        <div className="back-container position-absolute">
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
      <header className="header primary-text py-5 border-secondary header-border">
        <h5 className="text-center mb-0">{this.props.text}</h5>
        <div className="close-container position-absolute">
          <a href="http://group.hotelbeds.com/brand/roiback">
            <Icon type="close" size='md' />
          </a>
        </div>  
        {backBtnHtml}
      </header>
    );
  }
}