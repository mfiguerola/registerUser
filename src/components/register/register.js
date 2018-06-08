import React, { Component } from 'react';
import './register.css';
import Header from '../common/header';
import Form from "./form";

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
      const literals = pageConf.literals[this.props.location.params.value];
      const values = pageConf.form.values[this.props.location.params.value];
      // const formFields = pageConf.form.values.map(formValue => (
      //   <Link key={formValue} to={{
      //     pathname: '/register',
      //     params: { value: formValue }
      //   }}>
      //     <div className="primary-text row">
      //       <div className="col">{literals[formValue]}</div>
      //     </div>  
      //   </Link>
      // ));
      html = (
        <div className="home">
          <Header text={literals.header} />
          <div>
            <Form data={{literals, values}} />
          </div>
        </div>
      );
    }
    return html;
  }
}
