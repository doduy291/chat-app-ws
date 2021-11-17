import jwt from 'jsonwebtoken';

export const encodedToken = async (accountId) => {
  return jwt.sign({ accountId }, process.env.JWT_SECRET_KEY, {
    expiresIn: 24 * 3600 * 1000, // 1 day
  });
};
export const decodedToken = (token, secretKey) => {
  return jwt.decode(token, secretKey);
};
