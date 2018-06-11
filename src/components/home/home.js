import React, { Component } from "react";
import "./home.scss";
import Header from "../common/header";
import { Link } from "react-router-dom";

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
      const formFields = pageConf.form.values.map(formValue => (
        <Link key={formValue} to={{
          pathname: '/register',
          hash: formValue
        }}>
          <div className="primary-text row">
            <div className="col">{literals[formValue]}</div>
          </div>  
        </Link>
      ));
      html = (
        <div className="home">
          <Header text={literals.header} />
          <div>
            <h4 className="text-center">{literals.title}</h4>
          </div>
          <div className="container">
            {formFields}
          </div>
          <div className="text-center">{literals.persuasiveMessage}</div>
          <div>
            <a href="" className="secondary-text card-link text-center">
              {literals.loginLink}
            </a>
          </div>
        </div>
      );
    }
    return html;
  }
}
