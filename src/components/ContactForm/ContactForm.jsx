import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import { FormStyled, Label, Input, Button } from './ContactForm.styled';

class ContactForm extends Component {
  /*
  hendleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };*/
  /*
  hendleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state); //data

    this.reset();
  };*/
  handleSubmit = (contact, { resetForm }) => {
    console.log(contact);
    this.props.onSubmit(contact);
    resetForm();
  };

  /* reset = () => {
    this.setState({ name: '', number: '' });
  };*/

  render() {
    return (
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        onSubmit={this.hendleSubmit}
      >
        <FormStyled>
          <Label>
            Name
            <Input
              type="text"
              name="name"

              //onChange={this.hendleChange}
            />
          </Label>
          <Label>
            Number
            <Input
              type="tel"
              name="number"

              //onChange={this.hendleChange}
            />
          </Label>
          <Button type="submit">Add contact</Button>
        </FormStyled>
      </Formik>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
