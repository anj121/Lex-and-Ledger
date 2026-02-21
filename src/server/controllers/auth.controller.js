import { loginService, registerUserService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { username, password, userType = "user" } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password required",
      });
    }

    const data = await loginService({ username, password, userType });

    res.status(200).json({
      success: true,
      token: data.token,
      user: data.user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
export const register = async (req, res) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
