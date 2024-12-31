import User from "../models/User.js";
import apiResponse from "../utils/apiResponse.js";

// Create a new user (registration)
export const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return apiResponse.error(res, { message: "User already exists" }, 400);
    }

    // Create the user (without hashing the password)
    const user = await User.create({
      name,
      email,
      password, // Store password in plain text (not recommended for production)
    });

    return apiResponse.success(res, user, "User created successfully");
  } catch (error) {
    console.error(error);
    return apiResponse.error(res, error);
  }
};

// Login the user (authenticate)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return apiResponse.error(res, { message: "User not found" }, 404);
    }

    // Check if the provided password matches the stored password
    // Direct comparison (not recommended for production)
    if (user.password !== password) {
      return apiResponse.error(res, { message: "Invalid credentials" }, 400);
    }

    // Since we are not using JWT, no token will be returned
    return apiResponse.success(res, user, "Login successful");
  } catch (error) {
    console.error(error);
    return apiResponse.error(res, error);
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return apiResponse.error(res, { message: "Users not found" }, 404);
    }
    return apiResponse.success(res, users, "Users found successfully");
  } catch (error) {
    console.error(error);
    return apiResponse.error(res, error);
  }
};

// Get a single user by ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return apiResponse.error(res, { message: "User not found" }, 404);
    }
    return apiResponse.success(res, user, "User found successfully");
  } catch (error) {
    console.error(error);
    return apiResponse.error(res, error);
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return apiResponse.success(res, user, "User deleted successfully");
  } catch (error) {
    console.error(error);
    return apiResponse.error(res, error);
  }
};
