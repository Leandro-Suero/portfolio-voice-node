import Sequelize from "sequelize";
import { sequelize } from "../database/database";
import User from "./User";

const Trigger = sequelize.define(
  "triggers",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    triggers: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    response: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    underscored: true,
  }
);

User.hasMany(Trigger, {
  foreignKey: "user_id",
});
Trigger.belongsTo(User);

export default Trigger;
