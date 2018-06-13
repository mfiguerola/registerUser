import React, { Component } from 'react';
import Header from '../common/header';
import Form from "./form";
import './form.scss';

export default class Register extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    fetch("http://localhost:4000/page/register")
      .then(res => res.json())
      .then(pageConf => {
        this.setState({
          isLoading: false,
          pageConf
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error
        });
      });
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
      const literals = {...pageConf.literals[userType], ...pageConf.literals.common};
      const values = pageConf.form.values[userType];
      html = (
        <div className="register">
          <Header text={literals.header} hasBackButton={true} userType={userType}/>
          <div className="register-form px-2 pt-3">
            <Form data={{literals, values}} />
          </div>
        </div>
      );
    }
    return html;
  }
}
