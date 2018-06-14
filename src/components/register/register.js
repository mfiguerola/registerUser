import React, { Component } from 'react';
import Header from '../common/header/header';
import Form from './form/form';
import './form/form.scss';
import { loadPageConf } from '../../services/api';

export default class Register extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    loadPageConf('register', this);
  }
  
  render() {
    let html;
    if (this.state.error) {
      html = <div>Error: {this.state.error.message}</div>;
    } else if (this.state.isLoading) {
      html = <div>Loading...</div>;
    } else {
      const pageConf = this.state.pageConf;
      const userType = this.props.location.hash.substring(1);
      const literals = {
        ...pageConf.literals[userType],
        ...pageConf.literals.common
      };
      const values = pageConf.form.values[userType];
      html = (
        <div className="register">
          <Header
            text={literals.header}
            hasBackButton={true}
            userType={userType}
          />
          <div className="register-form px-2 pt-3">
            <Form data={{ literals, values }} />
          </div>
        </div>
      );
    }
    return html;
  }
}
