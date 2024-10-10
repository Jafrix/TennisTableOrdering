const {
  getTableController,
  createTablesController,
  deleteTablesController,
  updateTablesController,
} = require("../controllers/Tables.controller");

const verifyAccessToken = require("../middleware/verifyAccessToken");

const tableRouter = require("express").Router();

tableRouter
  .get("/", getTableController)
  .post("/", verifyAccessToken, createTablesController)
  .delete("/:id",verifyAccessToken, deleteTablesController)
  .put("/:id", verifyAccessToken, updateTablesController);

module.exports = tableRouter;
