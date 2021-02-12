import jwt from "jsonwebtoken";
import User from "../models/User";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    const user = await User.findByPk(req.userId);
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
