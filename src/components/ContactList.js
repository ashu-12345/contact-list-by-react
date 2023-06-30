import React, { useState, useEffect } from 'react';
import { fetchContacts, addContact, updateContact, deleteContact } from '../services/api';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '' });

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await fetchContacts();
        setContacts(response);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    getContacts();
  }, []);

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      const response = await addContact(newContact);
      setContacts([...contacts, response]);
      setNewContact({ name: '', email: '' });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleUpdateContact = async (id, updatedContact) => {
    try {
      const response = await updateContact(id, updatedContact);
      setContacts(contacts.map((contact) => (contact.id === id ? response : contact)));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      <form onSubmit={handleAddContact}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newContact.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>
                <button
                  className="action-button"
                  onClick={() => handleUpdateContact(contact.id, { ...contact, name: 'Updated Name' })}
                >
                  Update
                </button>
                <button className="action-button" onClick={() => handleDeleteContact(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
