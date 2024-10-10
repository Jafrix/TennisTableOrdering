// const { where } = require("sequelize");
const { Table } = require("../db/models");

class TableService {
  
  static async getTables() {
    try {
      const table = await Table.findAll();
      return table;
    } catch (error) {
      return error;
    }
  }

  static async createTable(data) {
    try {
      return await Table.create(data);
    } catch (error) {
      return error;
    }
  }

  static async updateTable(id, userId, data) {
    try {
      const table = await Table.findOne({ where: { id, userId } });

      if (!table) {
        return { table: "table not found" };
      }
      return await table.update(data);
    } catch (error) {
      return error;
    }
  }

  static async deleteTable(id, userId) {
    try {
      const table = await Table.findOne({ where: { id, userId } });

      if (!table) {
        return { isDeleted: false, message: "table not found" };
      }
      await table.destroy();
      return { isDeleted: true, message: "Success" };
    } catch (error) {
      return error;
    }
  }
}

module.exports = TableService;
