import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { fields: this.props.data.values };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.saveValues(this.getFields());
    if (this.isValid()) {
      this.props.history.push({
        pathname: '/welcome',
        hash: this.props.location.hash,
        params: { userName: this.refs.name._valueTracker.getValue() }
      });
    }
  }

  handleChange(event) {
    const fieldValues = this.state.fields.map(fieldValue => {
      if (fieldValue.key === event.target.name) {
        const value = event.target.value;
        fieldValue.isValid = this.isFieldValid(fieldValue, value);
        fieldValue.value = value;
      }
      return fieldValue;
    });
    this.setState({ fields: fieldValues });
  }

  isValid() {
    const invalidFields = this.state.fields.filter(
      fieldValue => !fieldValue.isValid
    );
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
    const formFields = this.state.fields.map(formConfig => {
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
    this.setState({ fields });
  }

  buildFormfields(values, literals) {
    return values.map(formValue => {
      const key = formValue.key;
      let requiredHtml = '';
      if (formValue.mandatory) {
        requiredHtml = <sup> *</sup>;
      }
      const baseInputClass = 'd-block pb-1';
      const validInputClass = formValue.isValid === false ? ' text-danger' : '';
      const value = this.state.fields.find(item => item.key === key).value || '';
      return (
        <label className={baseInputClass + validInputClass} key={key}>
          {literals[key].title}
          {requiredHtml}
          <input
            className="d-block w-100 mb-2"
            type={formValue.type}
            ref={key}
            name={key}
            value={value}
            placeholder={literals[key].placeholder}
            onChange={this.handleChange}
          />
        </label>
      );
    });
  }

  render() {
    const literals = this.props.data.literals;
    const values = this.state.fields || this.props.data.values;
    const formFields = this.buildFormfields(values, literals);
    return (
      <form onSubmit={this.handleSubmit}>
        {formFields}
        <div className="small font-weight-bold py-3">
          <sup>* </sup>
          {literals.requiredFields}
        </div>
        <input
          type="submit"
          className="btn btn-block"
          value={literals.buttonText}
        />
      </form>
    );
  }
}

export default withRouter(Form);
