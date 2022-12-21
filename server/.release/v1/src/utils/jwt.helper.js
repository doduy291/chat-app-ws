import jwt from 'jsonwebtoken';

export const encodedToken = async (accountId) => {
  return jwt.sign({ accountId }, process.env.JWT_SECRET_KEY, {
    expiresIn: 24 * 3600 * 1000, // 1 day
    // expiresIn: '1m', // 1 minute
  });
};
export const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};
