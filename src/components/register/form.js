import React, { Component } from "react";
import { Button } from "reactstrap";
import { withRouter } from 'react-router-dom';

class Form extends Component {
  state = { values: {} };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  
  handleChange(event) {
    // TODO: init values
    // this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // TODO: validate form fields
    this.props.history.push({
      pathname: '/welcome',
      hash: this.props.location.hash,
      params: { userName: 'sample' } // TODO: send user name
    });
  }

  render() {
    const literals = this.props.data.literals;
    const values = this.props.data.values;
    const formFields = values.map(formValue => {
      const key = formValue.key;
      
      return (
        <label key={key}>
          {literals[key].title}
          <input
            type={literals[key].type}
            // required={literals[key].mandatory} // TODO: set required fields
            // value={null}//{this.state.value} // TODO: set/get value
            placeholder={literals[key].placeholder}
            onChange={this.handleChange}
          />
        </label>
      )
    });
    return (
      <form onSubmit={this.handleSubmit}>
        {formFields}
        <sup>* </sup>{literals.requiredFields}
        <Button block>
          <input type="submit" value={literals.buttonText} />
        </Button>  
      </form>
    );
  }
}

export default withRouter(Form)