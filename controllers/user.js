import UserModel from "../models/users.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/generateToken.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!name || !email || !password) {
      console.log("All fields are mandatory");
    }
    if (existingUser) {
      res.status(409).json({ message: "User already exists!  Login instead" });
    }
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });
    try {
      newUser.save();
      let user= {
       id: newUser._id,
       name:newUser.name
      }
     const token= generateAccessToken(user)
      res
        .status(201)
        .json({ data: newUser, message: "user created successfully" , token:token});


    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Enter email and password");
    }
    const user = await UserModel.findOne({ email });
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (email == user.email && isPasswordCorrect == true) {
      res.status(200).json({ data: user, message: "Successfully loginned" });
    } else {
      res.status(404).json({ message: "incorrect email or password" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateUser = async (req,res) =>{
  try {
    const {id} = req.params
    const user = await UserModel.findByIdAndUpdate(id,req.body,{
      new: true,
    })
    if(!user){
      res.status(400).json({status:"failed", message: "User not found" })
    }
    res.status(200).json({status:"success",message: "successfully updated the user" , data: user })
  } catch (error) {
    res.status(500).json(err.message)
  }
}

export const deleteUser = async (req,res) =>{
  try {
    const {id} = req.params
    const user = await UserModel.findByIdAndDelete(id)
    if(!user){
      res.status(400).json({status:"failed", message: "User not found" })
    }
    res.status(200).json({status:"success",message: "Successfully deleted the user"})
  } catch (error) {
    res.status(500).json(err.message)
  }
}