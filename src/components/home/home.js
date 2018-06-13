import React, { Component } from "react";
import Header from "../common/header";
import { Link } from "react-router-dom";
import Icon from '../common/icon';
import "./home.scss";

export default class Home extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    fetch("http://localhost:4000/page/home")
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
      const literals = pageConf.literals;
      const formValuesLength = pageConf.form.values.length;
      const formFields = pageConf.form.values.map((formValue, i) => {
        let rowClass;
        if (formValuesLength === i + 1) {
          rowClass = 'light-text row mx-3 py-2 border-top border-bottom border-secondary';
        } else {
          rowClass = 'light-text row mx-3 py-2 border-top border-secondary';
        }
        return (
          <Link key={formValue} to={{
            pathname: '/register',
            hash: formValue
          }}>
            <div className={rowClass}>
              <div className="col">
                <Icon type="tick" size='sm' />
                <span className="pl-2">{literals[formValue]}</span>
              </div>
            </div>
          </Link>
        );
      });
      html = (
        <div className="home">
          <Header text={literals.header} />
          <div className="py-3 primary-text">
            <h5 className="text-center mb-0">{literals.title}</h5>
          </div>
          <div className="container px-0 pb-3">
            {formFields}
          </div>
          <div className="text-center small font-weight-bold px-2">{literals.persuasiveMessage}</div>
          <div className="position-absolute footer-container w-100">
            <a href="" className="secondary-text card-link text-center small d-block">
              {literals.loginLink}
            </a>
          </div>
        </div>
      );
    }
    return html;
  }
}
