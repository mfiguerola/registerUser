import React, { Component } from 'react';
import Header from '../common/header/header';
import { Link } from 'react-router-dom';
import Icon from '../common/icon/icon';
import './home.scss';
import { loadPageConf } from '../../services/api';

export default class Home extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    loadPageConf('home', this);
  }

  buildFormFields(values, literals) {
    const formValuesLength = values.length;
    return values.map((formValue, i) => {
      let rowClass;
      if (formValuesLength === i + 1) {
        rowClass =
          'light-text row mx-3 py-2 border-top border-bottom border-secondary';
      } else {
        rowClass = 'light-text row mx-3 py-2 border-top border-secondary';
      }
      return (
        <Link
          key={formValue}
          to={{
            pathname: '/register',
            hash: formValue
          }}
        >
          <div className={rowClass}>
            <div className="col">
              <Icon type="tick" size="sm" />
              <span className="pl-2">{literals[formValue]}</span>
            </div>
          </div>
        </Link>
      );
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
      const formFields = this.buildFormFields(pageConf.form.values, literals);
      html = (
        <div className="home">
          <Header text={literals.header} />
          <div className="py-3 primary-text">
            <h5 className="text-center mb-0">{literals.title}</h5>
          </div>
          <div className="container px-0 pb-3">{formFields}</div>
          <div className="text-center small font-weight-bold px-2">
            {literals.persuasiveMessage}
          </div>
          <div className="position-absolute footer-container w-100">
            <a
              href=""
              className="secondary-text card-link text-center small d-block"
            >
              {literals.loginLink}
            </a>
          </div>
        </div>
      );
    }
    return html;
  }
}
