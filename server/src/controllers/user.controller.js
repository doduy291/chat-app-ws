import asyncHandler from '../utils/asyncHandler.js';
import AccountModel from '../models/account.model.js';
import UserModel from '../models/user.model.js';
import { ErrorResponse } from '../utils/errorHandler.js';

export const getUserInfo = asyncHandler(async (req, res) => {
  const isLogged = res.locals.isLogged;
  if (!isLogged) throw new ErrorResponse(401, 'You have not logged in yet');
  return res.status(200).json({ user: req.user });
});
