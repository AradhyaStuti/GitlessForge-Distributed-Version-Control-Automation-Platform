const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require("./issue.router");
const prRouter = require("./pr.router");
const pipelineRouter = require("./pipeline.router");
const codeReviewRouter = require("./codeReview.router");
const projectBoardRouter = require("./projectBoard.router");
const apiKeyRouter = require("./apiKey.router");
const commentRouter = require("./comment.router");

const mainRouter = express.Router();

mainRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "Gitless Forge API Docs",
}));

mainRouter.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Gitless Forge API is running.",
    version: "1.0.0",
    docs: "/api/v1/docs",
  });
});

mainRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
  });
});

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);
mainRouter.use(prRouter);
mainRouter.use(pipelineRouter);
mainRouter.use(codeReviewRouter);
mainRouter.use(projectBoardRouter);
mainRouter.use(apiKeyRouter);
mainRouter.use(commentRouter);

module.exports = mainRouter;
