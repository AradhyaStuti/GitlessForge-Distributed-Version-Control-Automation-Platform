const express = require("express");
const apiKeyController = require("../controllers/apiKeyController");
const authMiddleware = require("../middleware/authMiddleware");
const { mongoIdParam } = require("../middleware/validate");
const { apiKeyValidation } = require("../middleware/validateExtended");

const apiKeyRouter = express.Router();

apiKeyRouter.get("/api-keys", authMiddleware, apiKeyController.listKeys);
apiKeyRouter.get("/api-keys/usage", authMiddleware, apiKeyController.getKeyUsage);
apiKeyRouter.post(
  "/api-keys",
  authMiddleware,
  apiKeyValidation,
  apiKeyController.createKey
);
apiKeyRouter.delete(
  "/api-keys/:id",
  authMiddleware,
  mongoIdParam,
  apiKeyController.revokeKey
);
apiKeyRouter.post(
  "/api-keys/:id/rotate",
  authMiddleware,
  mongoIdParam,
  apiKeyController.rotateKey
);

module.exports = apiKeyRouter;
