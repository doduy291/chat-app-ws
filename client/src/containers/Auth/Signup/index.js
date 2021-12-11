import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  SignupContainer,
  Form,
  AuthContainer,
  FormTitle,
  FormLabel,
  FormInput,
  FormTextLink,
  FormButton,
  FormPasswordWrapper,
} from '../styles';
import { emailValidation, passwordValidation, usernameValidation } from '../../../validation/auth.validation';
import { postSignup } from '../../../redux/actions/auth.action';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = ({ isAuth }) => {
  const [isShown, setIsShown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const { isLogged, errorMsg } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const redirectPath = location.search ? location.search.split('=')[1] : '/';
  const signupHandler = async (data) => {
    dispatch(postSignup(data));
  };

  useEffect(() => {
    setIsShown(true);
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
        <SignupContainer className={isDisabled && 'is-disabled'}>
          <Form onSubmit={handleSubmit(signupHandler)}>
            <FormTitle className="form__title">Create an account</FormTitle>
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
                {...register('email', { ...emailValidation.signup })}
                className={`form__input ${errors?.email?.message && 'form__input--error'}`}
                type="text"
              />
            </div>
            <div className="form-block">
              <FormLabel className="form__label">
                Username
                {errors?.username?.message && (
                  <span className="form__errorMessage">
                    <span className="seperator">-</span>
                    {errors.username.message}
                  </span>
                )}
              </FormLabel>
              <FormInput
                {...register('username', { ...usernameValidation.signup })}
                className={`form__input ${errors?.username?.message && 'form__input--error'}`}
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
                  {...register('password', { ...passwordValidation.signup })}
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
            <FormButton className="form__button" type="submit">
              Sign Up
            </FormButton>
            <FormTextLink className="form__text-link">
              <span>Have already an account? </span>
              <Link to="/login">Login</Link>
            </FormTextLink>
          </Form>
        </SignupContainer>
      </AuthContainer>
    </>
  );
};

export default Signup;
