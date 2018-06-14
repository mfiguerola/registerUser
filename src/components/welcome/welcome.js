import React, { Component } from 'react';
import Header from '../common/header/header';
import Icon from '../common/icon/icon';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { loadPageConf } from '../../services/api';

export default class Welcome extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    loadPageConf('welcome', this);
  }

  buildContentList(literals) {
    return literals.content.list.map(listItem => {
      return (
        <div className="row no-gutters pb-3">
          <div className="col-2">
            <Icon type="blueTick" size="md" />
          </div>
          <div className="col-10 text-left pl-2">
            <span className="primary-text">{ReactHtmlParser(listItem)}</span>
          </div>
        </div>
      );
    });
  }

  render() {
    let html;
    if (this.state.error) {
      html = <div>Error: {this.state.error.message}</div>;
    } else if (this.state.isLoading) {
      html = <div>Loading...</div>;
    } else if (this.props.location.params === undefined || this.props.location.params.userName === undefined) {
      html = <div>Error</div>;
      this.props.history.push({
        pathname: '/home'
      });
    } else {
      const pageConf = this.state.pageConf;
      const userType = this.props.location.hash.substring(1);
      const literals = {
        ...pageConf.literals[userType],
        ...pageConf.literals.common
      };
      const checkIconPositionvalue = pageConf.form.values[userType].checkIcon;
      const contentList = this.buildContentList(literals);
      const welcomeText = literals.title.prefix +
        this.props.location.params.userName +
        literals.title.suffix;
      const parsedWelcomeHtml = ReactHtmlParser(welcomeText);
      html = (
        <div className="welcome text-center">
          <Header text={literals.header} />
          <div className="px-2 pt-4">
            <Icon
              type="blueTick"
              size="bg"
              hasToHideIcon={checkIconPositionvalue === 'after'}
            />
            <div>{parsedWelcomeHtml}</div>
            <Icon
              type="blueTick"
              size="bg"
              hasToHideIcon={checkIconPositionvalue === 'before'}
            />
            <Link
              key={userType}
              to={{
                pathname: '/home'
              }}
            >
              <div className="primary-text py-3">{literals.content.title}</div>
              <div className="container">{contentList}</div>
              <input
                type="button"
                className="btn btn-block"
                value={literals.buttonText}
              />
            </Link>
          </div>
        </div>
      );
    }
    return html;
  }
}
