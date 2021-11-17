import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, connect, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Form, LoginContainer, AuthContainer } from '../styles';
import { postLogin } from '../../../redux/actions/auth.action';
import { emailValidation, passwordValidation } from '../../../validation/auth.validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ isAuth }) => {
  const [isShown, setIsShow] = useState(false);
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

  const redirectPath = location.search ? location.search.split('=')[1] : '/';
  const loginHandler = async (data) => {
    dispatch(postLogin(data));
  };

  useEffect(() => {
    setIsShow(true);
    if (errorMsg) {
      setError(errorMsg?.name, { type: 'server', message: errorMsg?.message });
    }
    if (isLogged || isAuth) window.location.href = redirectPath;
  }, [redirectPath, isLogged, isAuth, errorMsg, setError]);
  return (
    <>
      <AuthContainer className={isShown && 'is-shown'}>
        <LoginContainer>
          <Form onSubmit={handleSubmit(loginHandler)}>
            <h3 className="form__title">Login</h3>
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
                {...register('email', { ...emailValidation.login })}
                className={`form__input ${errors?.email?.message && 'form__input--error'}`}
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
                  {...register('password', { ...passwordValidation.login })}
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
            <div className="form__text-link">
              <Link to="/">Forgot password?</Link>
            </div>
            <button className="form__button" type="submit">
              Login
            </button>
            <div className="form__text-link">
              <span>Need an account? </span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </LoginContainer>
      </AuthContainer>
    </>
  );
};

export default connect()(Login);
