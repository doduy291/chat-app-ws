const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const usernameRegex = /^[A-Za-z0-9 ]{2,15}$/;
// Minimum eight characters, at least one uppercase letter, one lowercase letter,one number and one special symbol
// const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
// const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,.\\\/;':"-]).{8,}$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const emailValidation = {
  login: {
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: emailRegex,
      message: 'Email is invalid',
    },
  },
  signup: {
    required: { value: true, message: 'Email is required' },
    pattern: {
      value: emailRegex,
      message: 'Email is invalid',
    },
  },
};

export const passwordValidation = {
  login: {
    required: { value: true, message: 'Password is required' },
  },
  signup: {
    required: { value: true, message: 'Password is required' },
    minLength: {
      value: 8,
      message: 'Password must contain at least 8 characters',
    },
    pattern: {
      value: passwordRegex,
      message: 'Password is too weak or common to use',
    },
  },
};

export const usernameValidation = {
  signup: {
    required: { value: true, message: 'Username is required' },
    minLength: {
      value: 2,
      message: 'Username must contain at least 2 characters',
    },
    maxLength: {
      value: 15,
      message: 'Username cannot be more than 15 characters',
    },
    pattern: {
      value: usernameRegex,
      message: 'Username cannot contain number or special symbol',
    },
  },
};
