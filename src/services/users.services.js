import User from "../models/User";

export const createUser = async ({ username, password = null }) => {
  let hashedPassword = null;
  if (password !== null) {
    hashedPassword = await User.encryptPassword(password);
  }
  const savedUser = await User.create(
    {
      username,
      password: hashedPassword,
    },
    {
      fields: ["username", "password"],
    }
  );
  return savedUser;
};

export const getUsers = async () => {
  return User.findAndCountAll({});
};

export const getUserById = async (userId) => {
  return User.findByPk(userId);
};

export async function deleteUserById(userId) {
  const userFound = await User.findByPk(userId);
  if (userFound) {
    const destroyed = await userFound.destroy();
    return destroyed;
  } else {
    return false;
  }
}
