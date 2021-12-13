import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Form,
  LoginContainer,
  AuthContainer,
  FormTitle,
  FormLabel,
  FormInput,
  FormTextLink,
  FormButton,
  FormPasswordWrapper,
} from '../styles';
import { postLogin } from '../../../redux/actions/auth.action';
import { emailValidation, passwordValidation } from '../../../validation/auth.validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ isAuth }) => {
  const [isShown, setIsShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const { isLogged, errorMsg } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const redirectPath = location.search ? location.search.split('=')[1] : '/channel';
  const loginHandler = async (data) => {
    setIsDisabled(true);
    dispatch(postLogin(data));
  };

  useEffect(() => {
    setIsShow(true);
  }, []);

  useEffect(() => {
    if (errorMsg) {
      setError(errorMsg?.name, { type: 'server', message: errorMsg?.message });
    }
    if (Object.keys(errors).length) {
      setIsDisabled(false);
    }
  }, [errors, errorMsg, setError]);

  useEffect(() => {
    if (isLogged || isAuth) {
      setTimeout(
        () => {
          window.location.href = redirectPath;
        },
        isLogged ? 1500 : 0
      );
    }
  }, [redirectPath, isLogged, isAuth]);

  return (
    <>
      <AuthContainer className={isShown && 'is-shown'}>
        <LoginContainer className={isDisabled && 'is-disabled'}>
          <Form onSubmit={handleSubmit(loginHandler)}>
            <FormTitle className="form__title">Login</FormTitle>
            <div className="form-block">
              <FormLabel className="form__label">
                Email
                {errors?.email?.message && (
                  <span className="form__errorMessage">
                    <span className="seperator">-</span>
                    {errors.email.message}
                  </span>
                )}
              </FormLabel>
              <FormInput
                {...register('email', { ...emailValidation.login })}
                className={`form__input ${errors?.email?.message && 'form__input--error'}`}
                type="text"
              />
            </div>
            <div className="form-block">
              <FormLabel className="form__label">
                Password
                {errors?.password?.message && (
                  <span className="form__errorMessage">
                    <span className="seperator">-</span>
                    {errors.password.message}
                  </span>
                )}
              </FormLabel>
              <FormPasswordWrapper className="form__password">
                <FormInput
                  {...register('password', { ...passwordValidation.login })}
                  className={`form__input ${errors?.password?.message && 'form__input--error'}`}
                  type={!isVisibility ? 'password' : 'text'}
                />
                {!isVisibility ? (
                  <VisibilityOff onClick={() => setIsVisibility((currentState) => !currentState)} />
                ) : (
                  <Visibility onClick={() => setIsVisibility((currentState) => !currentState)} />
                )}
              </FormPasswordWrapper>
            </div>
            <FormTextLink className="form__text-link">
              <Link to="/">Forgot password?</Link>
            </FormTextLink>
            <FormButton className="form__button" type="submit">
              Login
            </FormButton>
            <FormTextLink className="form__text-link">
              <span>Need an account? </span>
              <Link to="/signup">Sign Up</Link>
            </FormTextLink>
          </Form>
        </LoginContainer>
      </AuthContainer>
    </>
  );
};

export default connect()(Login);
