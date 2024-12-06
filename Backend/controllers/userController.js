import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//@desc     Auth user & get token
//@route    POST/api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc     Register user
//@route    POST/api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});
//@desc     Register user by ID
//@route    POST/api/users/:id
//@access   Public
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user By Id");
});

//@desc     Logout user / clear cookie
//@route    POST/api/users/logout
//@access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("Logout user");
});

//@desc     get user profile
//@route    GET/api/users/profile
//@access   private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc     update user profile
//@route    GET/api/users/profile
//@access   private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user  profile");
});

//@desc     get users
//@route    GET/api/users
//@access   private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@desc     Delete users
//@route    DELETE/api/users/:id
//@access   private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});
//@desc     update users
//@route    PUT/api/users/:id
//@access   private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };
