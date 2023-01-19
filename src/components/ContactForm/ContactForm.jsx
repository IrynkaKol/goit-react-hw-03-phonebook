import React, { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
//import * as yup from 'yup';

import { FormStyled, Label, Input, Button } from './ContactForm.styled';

class ContactForm extends Component {

  
  hendleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  /*hendleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state); //data

    this.reset();
  };*/
  handleSubmit = (contact, { resetForm }) => {
    this.props.onSubmit(contact);
    resetForm();
  };

  /* reset = () => {
    this.setState({ name: '', number: '' });
  };*/


  render() {
    /*const schema = yup.object().shape({
        name: yup.string().required(),
        number: yup.string().min(8).max(16).required(),
      });*/
    
    return (
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        onSubmit={this.hendleSubmit}
      >
        <FormStyled>
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              name="name"
              placeholder="Name"
              //onChange={this.hendleChange}
            />
            <ErrorMessage name="name" />
          </Label>
          <Label htmlFor="number">
            Number
            <Input
              type="tel"
              name="number"
              placeholder="123-456-789"
              //onChange={this.hendleChange}
            />
            <ErrorMessage name="number" />
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
