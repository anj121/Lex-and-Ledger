import User from "../models/User.js";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/jwt.js";

export const loginService = async ({ username, password, userType }) => {
  let account;

  if (userType === "admin") {
    account = await Admin.findOne({ username }).select("+password");
  } else {
    account = await User.findOne({ username }).select("+password");
  }

  if (!account) {
    throw new Error("Invalid credentials");
  }

  if (!account.isActive) {
    throw new Error("Account is deactivated");
  }

  if (account.isLocked) {
    throw new Error("Account is locked");
  }

  const isMatch = await account.comparePassword(password);
  if (!isMatch) {
    if (account.incLoginAttempts) {
      await account.incLoginAttempts();
    }
    throw new Error("Invalid credentials");
  }

  if (account.resetLoginAttempts) {
    await account.resetLoginAttempts();
  }

  const token = generateToken({
    id: account._id,
    userType,
  });

  return {
    token,
    user: {
      id: account._id,
      username: account.username,
      email: account.email,
      role: account.role,
      userType,
    },
  };
};

export const registerUserService = async (data) => {
  const exists = await User.findOne({
    $or: [{ username: data.username }, { email: data.email }],
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const user = await User.create(data);

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
};
