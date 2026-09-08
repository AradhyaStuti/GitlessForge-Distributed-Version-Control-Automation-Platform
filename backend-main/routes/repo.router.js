const express = require("express");
const repoController = require("../controllers/repoController");
const authMiddleware = require("../middleware/authMiddleware");
const { authenticateAny, requireScope } = require("../middleware/apiKeyAuth");
const { createRepoRules, mongoIdParam, paginationRules } = require("../middleware/validate");

const repoRouter = express.Router();

repoRouter.get("/repo/all", paginationRules, repoController.getAllRepositories);
// create/update accept either a JWT or an API key so scripts can use the same routes
repoRouter.post(
  "/repo/create",
  authenticateAny,
  requireScope("repo:write"),
  createRepoRules,
  repoController.createRepository
);
repoRouter.put(
  "/repo/update/:id",
  authenticateAny,
  requireScope("repo:write"),
  mongoIdParam,
  repoController.updateRepositoryById
);
repoRouter.delete(
  "/repo/delete/:id",
  authMiddleware,
  mongoIdParam,
  repoController.deleteRepositoryById
);
repoRouter.get("/repo/:id", mongoIdParam, repoController.fetchRepositoryById);

module.exports = repoRouter;
