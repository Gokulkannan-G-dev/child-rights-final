const Model = require("../models/Campaign");

async function list(req, res, next) {
  try {
    const items = await Model.find().sort({ createdAt: -1 });
    res.json({ campaigns: items });
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const item = await Model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found." });
    res.json({ campaign: item });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const item = await Model.create(req.body);
    res.status(201).json({ campaign: item });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Not found." });
    res.json({ campaign: item });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };
