import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

class Form extends Component {
  fieldValues = this.props.data.values;
  handleSubmit = this.handleSubmit.bind(this);
  emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      

  handleSubmit(event) {
    event.preventDefault();
    this.saveValues(this.getFields());
    if (this.isValid()) {
      this.props.history.push({
        pathname: '/welcome',
        hash: this.props.location.hash,
        params: { userName: this.refs.name._valueTracker.getValue() }
      });
    } else {
      alert('Errors on form!'); // TODO: mark invalid inputs in red
    }  
  }

  isValid() {
    const invalidFields = this.fieldValues.filter(fieldValue => !fieldValue.isValid);
    return invalidFields.length === 0;
  }

  isFieldValid(formConfig, value) {
    if (formConfig.mandatory && value === '') {
      return false;
    }
    if (formConfig.type === 'email') {
      return this.emailRegExp.test(value);
    }
    return true;
  }

  getFields() {
    const formFields = this.fieldValues.map(formConfig => {
      const value = this.refs[formConfig.key]._valueTracker.getValue();
      return {
        ...formConfig,
        ...{
          value: value,
          isValid: this.isFieldValid(formConfig, value)
        }
      };
    });
    return formFields;
  }

  saveValues(fields) {
    this.fieldValues = Object.assign(this.fieldValues, fields);
  }

  render() {
    const literals = this.props.data.literals;
    const values = this.props.data.values;
    const formFields = values.map(formValue => {
      const key = formValue.key;
      let requiredHtml = '';
      if (formValue.mandatory) {
        requiredHtml = <sup> *</sup>;
      }
      return (
        <label className="d-block pb-1" key={key}>
          {literals[key].title}{requiredHtml}
          <input
            className="d-block w-100 mb-2"  
            type={formValue.type}
            ref={key}
            placeholder={literals[key].placeholder}
            onChange={this.handleChange}
          />
        </label>
      );
    });
    return (
      <form onSubmit={this.handleSubmit}>
        {formFields}
        <div className="small font-weight-bold py-3">
          <sup>* </sup>{literals.requiredFields}
        </div>
        <input type="submit" className="btn btn-block" value={literals.buttonText} /> 
      </form>
    );
  }
}

export default withRouter(Form)