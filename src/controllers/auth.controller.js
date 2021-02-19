import jwt from "jsonwebtoken";
import User from "../models/User";
import { createUser } from "../services/users.services";

export const login = async (req, res) => {
  console.log(req.body);
  try {
    const userFound = await User.scope("withPassword").findOne({
      where: { username: req.body.username },
    });
    if (!userFound) return res.status(404).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign(
      {
        id: userFound.id,
        username: userFound.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 7776000, // 90 days
      }
    );

    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await User.findOne({ where: { username: username } });
    if (userFound) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await createUser(req.body);
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: 7776000, // 90 days
      }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
