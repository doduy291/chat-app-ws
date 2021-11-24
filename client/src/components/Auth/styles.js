import styled from '@emotion/styled';

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const AuthContainer = styled.div`
  width: 480px;
  font-size: 18px;
  border-radius: 5px;
  box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
  background: #36393f;
  padding: 32px;
  opacity: 0;
  transform: scale(0);
  transition: 400ms ease-out;

  &.is-shown {
    opacity: 1;
    transform: scale(1);
  }
`;
export const Form = styled.form`
  color: #b9bbbe !important;

  .form__title {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .form-block {
    margin-top: 20px;
  }
  .form__label {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 3px;
    color: #fff;
  }
  .form__input {
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.2);
    color: #b9bbbe !important;
    font-size: 14px;
    transition: 200ms ease-out;

    &:hover {
      border-color: var(--main-lighter-color);
    }
    &:focus {
      border-color: var(--main-color);
    }
    &.form__input--error {
      border: 1px solid var(--danger-color);
    }
  }
  .form__text-link {
    margin-top: 5px;
    font-size: 13px;
    color: var(--main-lighter-color);

    span {
      color: #72767d;
    }

    a:hover {
      text-decoration: underline;
    }
  }
  .form__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: 3px;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: var(--main-color);
    margin-top: 20px;
    padding: 16px 0;

    &:hover {
      background-color: var(--main-brighter-color);
    }
  }
  .form__errorMessage {
    color: var(--danger-color);
    text-transform: none;
    font-size: 12px;
    font-style: italic;
    font-weight: 300;

    .seperator {
      display: inline;
      font-style: normal;
      padding: 0 4px;
    }
  }

  .form__password {
    position: relative;
    display: flex;
    align-items: center;

    input {
      padding-right: 10%;
    }
    .MuiSvgIcon-root {
      position: absolute;
      right: 10px;
      color: #fff;
    }
  }
`;
export const LoginContainer = styled.div``;
export const SignupContainer = styled.div``;
