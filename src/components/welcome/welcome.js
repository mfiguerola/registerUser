import React, { Component } from 'react';
import './welcome.scss';
import Header from '../common/header';
import Icon from '../common/icon';
import { Link } from "react-router-dom";

export default class Welcome extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    fetch("http://localhost:4000/page/welcome")
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
    } else if (this.props.location.params === undefined || this.props.location.params.userName === undefined) {
      html = <div>Error</div>;  
      this.props.history.push({
        pathname: '/home'
      });
    } else {
      const pageConf = this.state.pageConf;
      const userType = this.props.location.hash.substring(1);
      const literals = {...pageConf.literals[userType], ...pageConf.literals.common};
      const checkIconPositionvalue = pageConf.form.values[userType].checkIcon;
      html = (
        <div className="welcome text-center">
          <Header text={literals.header} />
          <div>
            if (checkIconPositionvalue === 'before') {
              <Icon type="tick" size='big' />
            }
            <div dangerouslySetInnerHTML={{
              __html: literals.title.prefix + this.props.location.params.userName + literals.title.suffix
            }} />
            if (checkIconPositionvalue === 'after') {
              <Icon type="tick" size='big' />
            }
          </div>
          <Link key={userType} to={{
            pathname: '/home'
          }}>
          <div className="primary-text row">
            <div className="col">{literals.buttonText}</div>
          </div>  
        </Link>
        </div>
      );
    }
    return html;
  }
}
