const { User } = require("../db/models");

class UserService {
  static async getUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      return error;
    }
  }

  static async createUser(data) {
    try {      
      return await User.create(data);
    } catch (error) {
      return error;
    }
  }

  static async updateUser(id, data) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return { message: "User not found" };
      }
      return await user.update(data);
    } catch (error) {
      return error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return { message: "User not found" };
      }
      return await user.destroy();
    } catch (error) {
      return error;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await User.findOne({ where: { email } });
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserService;
