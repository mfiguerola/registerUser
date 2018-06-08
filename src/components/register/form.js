import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class Form extends Component {
  // constructor(props) {
  // super(props);
  //   this.state = {value: ''};

  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }
  state = { values: {} };
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  
  handleChange(event) {
    // this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const literals = this.props.data.literals;
    const values = this.props.data.values;
    const formFields = values.map(formValue => {
      const key = formValue.key;
      return (
        // <Link key={formValue} to={{
        //   pathname: '/register',
        //   params: { value: formValue }
        // }}>
        //   <div className="primary-text row">
        //     <div className="col">{literals[formValue]}</div>
        //   </div>  
        // </Link>
        <label key={formValue.key} >
          {literals[key].title}
          <input
            type={literals[key].type}
            value={null}//{this.state.value}
            placeholder={literals[key].placeholder}
            onChange={this.handleChange}
          />
        </label>
      )
    });
    return (
      <form onSubmit={this.handleSubmit}>
        {formFields}
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
