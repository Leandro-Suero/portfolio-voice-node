import Trigger from "../models/Trigger";

export async function getTriggers() {
  return Trigger.findAndCountAll({});
}

export async function getUserTriggers(userId) {
  return Trigger.findAndCountAll({
    where: { user_id: userId },
  });
}

export async function createTrigger({ triggers, response, user_id }) {
  return Trigger.create(
    {
      triggers,
      response,
      user_id,
    },
    {
      fields: ["triggers", "response", "user_id"],
    }
  );
}

export async function getTriggerById(triggerId) {
  return Trigger.findOne({
    where: { id: triggerId },
  });
}

export async function updateTriggerById({ ...triggerNewData }) {
  const triggerFound = await Trigger.findByPk(triggerNewData.id);
  for (const prop in triggerNewData) {
    triggerFound[prop] = triggerNewData[prop];
  }
  const updated = await triggerFound.save();
  return updated;
}

export async function deleteTriggerById(triggerId) {
  const triggerFound = await Trigger.findByPk(triggerId);
  if (triggerFound) {
    const destroyed = await triggerFound.destroy();
    return destroyed;
  } else {
    return false;
  }
}
