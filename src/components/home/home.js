import React, { Component } from "react";
import "./home.css";
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
        <Link to="/register">
          {/* <Button>{literals[formValue]}</Button> */}
          <div class="row">
            <div class="col">{literals[formValue]}</div>
          </div>  
        </Link>
      ));
      html = (
        <div className="home">
          <Header text={literals.header} />
          <div>
            <h4 class="text-center">{literals.title}</h4>
          </div>
          <div class="container">
            {formFields}
          </div>
          <div class="text-center">{literals.persuasiveMessage}</div>
          <div>
            <a href="#" class="card-link text-center">
              {literals.loginLink}
            </a>
          </div>
        </div>
      );
    }
    return html;
  }
}
