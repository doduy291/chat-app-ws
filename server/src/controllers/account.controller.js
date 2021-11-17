import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import AccountModel from '../models/account.model.js';
import UserModel from '../models/user.model.js';
import { encodedToken } from '../utils/jwt.helper.js';
import { ErrorResponse } from '../utils/errorHandler.js';
// @ErrorHandle structure:  ErrorResponse(status, {name: 'field input', message: 'error message'})

export const postSignUp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Check account existence
  const doesExistAccount = await AccountModel.exists({ email });
  if (doesExistAccount) {
    throw new ErrorResponse(403, { name: 'email', message: 'Email is already in use' });
  }
  // Create new account
  const newAccount = await AccountModel.create({ email: email, password: password });
  if (!newAccount) throw new ErrorResponse(400, 'Cannot create account, try again');

  // Create new user
  const newUser = await UserModel.create({ username: username, accountId: newAccount._id });
  if (!newUser) throw new ErrorResponse(400, 'Cannot create account, try again');

  // Set cookie with JWT
  const token = await encodedToken(newUser.accountId);
  res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });
  return res.status(201).json({
    message: 'Account was created successfully',
  });
});

export const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check account existence
  const account = await AccountModel.findOne({ email: email });
  if (!account) throw new ErrorResponse(401, { name: 'email', message: 'Account is not existed' });

  // Check password
  const doesMatch = await bcrypt.compare(password, account.password);
  if (!doesMatch) throw new ErrorResponse(401, { name: 'password', message: 'Password does not match' });

  // Set cookie with JWT
  const token = await encodedToken(account._id);
  res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: false });
  return res.status(200).json({
    message: 'Login succesfully',
    token,
  });
});
