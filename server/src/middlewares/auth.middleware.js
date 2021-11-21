import UserModel from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { decodedToken } from '../utils/jwt.helper.js';

export const authProtect = asyncHandler(async (req, res, next) => {
  res.locals.isLogged = false;
  let token = req.cookies ? req.cookies.token : null;
  if (!token) {
    return next();
  }

  const decoded = decodedToken(token, process.env.JWT_SECRET_KEY);
  if (decoded) {
    const accountId = decoded.accountId;
    let user = await UserModel.findOne({ accountId }).select('_id username avatar role');

    if (user) {
      user.accountId = accountId;
      res.locals.isLogged = true;
      req.user = user;
    }
  }
  next();
});
