import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { SignupContainer, Form, AuthContainer } from '../styles';
import { emailValidation, passwordValidation, usernameValidation } from '../../../validation/auth.validation';
import { postSignup } from '../../../redux/actions/auth.action';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Signup = ({ isAuth }) => {
  const [isShown, setIsShow] = useState(false);
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
    setIsShow(true);
    if (errorMsg) {
      setError(errorMsg?.name, { type: 'server', message: errorMsg?.message });
    }
    if (isLogged || isAuth) window.location.href = redirectPath;
  }, [redirectPath, isAuth, isLogged, errorMsg, setError]);
  return (
    <>
      <AuthContainer className={isShown && 'is-shown'}>
        <SignupContainer>
          <Form onSubmit={handleSubmit(signupHandler)}>
            <h3 className="form__title">Create an account</h3>
            <div className="form-block">
              <div className="form__label">
                Email
                {errors?.email?.message && (
                  <span className="form__errorMessage">
                    <span className="seperator">-</span>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <input
                {...register('email', { ...emailValidation.signup })}
                className={`form__input ${errors?.email?.message && 'form__input--error'}`}
                type="text"
              />
            </div>
            <div className="form-block">
              <div className="form__label">
                Username
                {errors?.username?.message && (
                  <span className="form__errorMessage">
                    <span className="seperator">-</span>
                    {errors.username.message}
                  </span>
                )}
              </div>
              <input
                {...register('username', { ...usernameValidation.signup })}
                className={`form__input ${errors?.username?.message && 'form__input--error'}`}
                type="text"
              />
            </div>
            <div className="form-block">
              <div className="form__label">
                Password
                {errors?.password?.message && (
                  <span className="form__errorMessage">
                    <span className="seperator">-</span>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form__password">
                <input
                  {...register('password', { ...passwordValidation.signup })}
                  className={`form__input ${errors?.password?.message && 'form__input--error'}`}
                  type={!isVisibility ? 'password' : 'text'}
                />
                {!isVisibility ? (
                  <VisibilityOff onClick={() => setIsVisibility((currentState) => !currentState)} />
                ) : (
                  <Visibility onClick={() => setIsVisibility((currentState) => !currentState)} />
                )}
              </div>
            </div>
            <button className="form__button" type="submit">
              Sign Up
            </button>
            <div className="form__text-link">
              <span>Have already an account? </span>
              <Link to="/login">Login</Link>
            </div>
          </Form>
        </SignupContainer>
      </AuthContainer>
    </>
  );
};

export default Signup;
