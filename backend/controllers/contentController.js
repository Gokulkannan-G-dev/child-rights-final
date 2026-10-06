const Article = require("../models/Article");

async function listArticles(req, res, next) {
  try {
    const { type } = req.query;
    const query = type && type !== "All" ? { type } : {};
    const articles = await Article.find(query).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    next(err);
  }
}

async function getArticle(req, res, next) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found." });
    res.json({ article });
  } catch (err) {
    next(err);
  }
}

async function createArticle(req, res, next) {
  try {
    const article = await Article.create(req.body);
    res.status(201).json({ article });
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ message: "Article not found." });
    res.json({ article });
  } catch (err) {
    next(err);
  }
}

async function deleteArticle(req, res, next) {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { listArticles, getArticle, createArticle, updateArticle, deleteArticle };
