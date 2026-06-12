import authModel from "../Model/AuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res, next) => {
  const { fullName, email, password, confirmPassword, penName, Profile } =
    req.body;
  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(400).json({
      status: "error",
      message: "fullName, email, password and confirmPassword are required",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "error",
      message: "password and confirmPassword do not match",
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await authModel.create({
      ...req.body,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Unable to create User",
      });
    }
    return res.status(201).json({
      status: "success",
      message: "User signed Up Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "email and password are required",
    });
  }
  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });
    return res.status(200).json({
      status: "success",
      message: "User signed in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyToken = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized, no token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await authModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized, user not found",
      });
    }
    req.user = user;
    next();
    // res.status(200).json({
    //   status: "success",
    //   message: "You are authenticated",
    //   data: user,
    // });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized, invalid token",
    });
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { token } = req.body;
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    );
    const googleUser = await response.json();

    let user = await authModel.findOne({ email: googleUser.email });
    let isNewUser = false;
    if (!user) {
      ((user = await authModel.create({
        fullName: googleUser.name,
        email: googleUser.email,

        password: Math.random().toString(36), // random password
        googleId: googleUser.id,
      })),
        (isNewUser = true));
    }
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP,
    });

    return res.status(200).json({
      status: "success",
      token: jwtToken,
      message: "Google login successful",
      needsProfile: user.Profile,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        Profile: user.Profile,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const { Profile } = req.body;

  try {
    const user = await authModel
      .findByIdAndUpdate(
        req.user._id,
        {
          Profile,
        },
        { new: true },
      )
      .select("-password");
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Unable to Update Profile",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
