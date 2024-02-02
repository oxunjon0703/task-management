import jwt from "jsonwebtoken";

import { config } from "../common/config/index.js";

export const generateToken = (data) => {
  const token = jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) + (300 * 60) },
    config.jwtKey
  );
  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtKey);
};
