import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import Section from '../Section/Section';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHendler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (
      !this.state.contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    } else {
      alert(`${data.name} is already in contacts.`);
    }
    //console.log(data);
    //console.log(contact);
  };

  deleteContacts = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== e),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    console.log('App component DidMount')
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts)
    if(parseContacts) {
      this.setState({ contacts: parseContacts })
    }
    //console.log(parseContacts)
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('App component DidUpdate')
    if(this.state.contacts !== prevState.contacts) {
      console.log('Оновились контакти, записуємо їх до сховища')
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
    
    //console.log(prevState)
    //console.log(this.state)
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHendler} />
        </Section>
        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContacts={this.deleteContacts}
          />
        </Section>
      </Container>
    );
  }
}

