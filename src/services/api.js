import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchContacts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch contacts');
  }
};

export const addContact = async (contact) => {
  try {
    const response = await axios.post(API_BASE_URL, contact);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add contact');
  }
};

export const updateContact = async (id, updatedContact) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedContact);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update contact');
  }
};

export const deleteContact = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete contact');
  }
};
