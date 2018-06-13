import React, { Component } from 'react';
import Header from '../common/header';
import Icon from '../common/icon';
import { Link } from "react-router-dom";
import './welcome.scss';

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
      const contentList = literals.content.list.map(listItem => {
        return (
          <div className="row no-gutters pb-3">
            <div className="col-2">
              <Icon type="blueTick" size='md' />
            </div>
            <div className="col-10 text-left pl-2">
              <span className="primary-text">{listItem}</span>
            </div>
          </div>
        );
      });
      html = (
        <div className="welcome text-center">
          <Header text={literals.header} />
          <div className="px-2 pt-4">
            <Icon type="blueTick" size='bg' hasToHideIcon={checkIconPositionvalue === 'after'}/>
            <div dangerouslySetInnerHTML={{
              __html: literals.title.prefix + this.props.location.params.userName + literals.title.suffix
            }} />
            <Icon type="blueTick" size='bg' hasToHideIcon={checkIconPositionvalue === 'before'}/>
            <Link key={userType} to={{
              pathname: '/home'
            }}>
              <div className="primary-text py-3">
                {literals.content.title}
              </div> 
              <div className="container">
                {contentList}
              </div>
              <input type="button" className="btn btn-block" value={literals.buttonText}/>
            </Link>
          </div>  
        </div>
      );
    }
    return html;
  }
}
