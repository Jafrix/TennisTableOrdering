const TableService = require("../services/Table.service");
// ===================================================================================================
async function getTableController(req, res) {
  try {
    const tables = await TableService.getTables();
    res.status(200).json({ tables });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
// ===================================================================================================
async function createTablesController(req, res) {
  const { day, time } = req.body;
  const { user } = res.locals;

  try {
    if (!time) {
      res.status(400).json({
        error: "Нам очень нужны данные ! ",
      });
    } else {
      const table = await TableService.createTable({
        day,
        time,
        userId: user.id,
      });

      res.status(201).json({ table });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// ===================================================================================================
async function deleteTablesController(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const { isDeleted } = await TableService.deleteTable(id, user.id);

    if (isDeleted) {
      res.status(200).json({ message: "Deleted" });
    } else {
      res.status(400).json({ message: "Not found Table" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ===================================================================================================
async function updateTablesController(req, res) {
  const { id } = req.params;
  const { day, time } = req.body;
  const { user } = res.locals;

  // console.log(req.body, "BODY FROM CONTOLLER");

  try {
    const table = await TableService.updateTable(id, user.id, {
      day,
      time,
    });

    if (post) {
      res.status(200).json({ table });
    } else {
      res.status(400).json({ message: "Not update" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getTableController,
  createTablesController,
  deleteTablesController,
  updateTablesController,
};
