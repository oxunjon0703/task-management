import bcrypt from "bcrypt";

export const hashed = async (data) => {
  const salt = 10;
  return bcrypt.hash(data, salt);
};

export const compare = async (data, hashData) => {
  return await bcrypt.compare(data, hashData);
};
