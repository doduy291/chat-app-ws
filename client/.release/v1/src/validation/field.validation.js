import { emailRegex } from '../constants/regex';

export const fieldValidation = {
  createChannel: {
    required: { value: true, message: 'Cannot be empty' },
  },
  addContact: {
    required: { value: true, message: 'Cannot be empty' },
    pattern: {
      value: emailRegex,
      message: 'Email is invalid',
    },
  },
};
