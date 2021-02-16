import * as triggerService from "../services/triggers.services";

export async function getTriggers(req, res) {
  try {
    const triggers = await triggerService.getTriggers();
    return res.json({
      data: triggers.rows,
      total: triggers.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getUserTriggers(req, res) {
  try {
    const triggers = await triggerService.getUserTriggers(req.params.userId);
    return res.json({
      data: triggers.rows,
      total: triggers.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function createTrigger(req, res) {
  try {
    const newTrigger = await triggerService.createTrigger(req.body);
    if (newTrigger) {
      return res.json({
        message: "Trigger created succesfully",
        data: newTrigger,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function getTriggerById(req, res) {
  try {
    const trigger = await triggerService.getTriggerById(req.params.triggerId);
    return res.json({
      data: trigger,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function updateTriggerById(req, res) {
  try {
    const updated = await triggerService.updateTriggerById(req.body);
    if (updated) {
      return res.status(200).json(updated);
    }
    return res.status(500).json({ message: "Something went wrong", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}

export async function deleteTriggerById(req, res) {
  try {
    const destroyed = await triggerService.deleteTriggerById(
      req.params.triggerId
    );
    if (destroyed) {
      return res.status(204).json({ message: "Trigger deleted!", data: {} });
    }
    return res.status(404).json({ message: "Trigger not found", data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", data: {} });
  }
}
