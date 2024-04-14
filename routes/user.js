// user.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  constructor(db) {
    this.db = db;
  }

  async register(username, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword]
      );
      return { success: true };
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Failed to register user");
    }
  }

  async login(username, password) {
    try {
      const user = await this.db.get("SELECT * FROM users WHERE username = ?", [
        username,
      ]);
      if (!user) {
        throw new Error("Invalid username or password");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid username or password");
      }
      const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY");
      return { token };
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login");
    }
  }

  async getAllUsers() {
    try {
        const users = await this.db.all("SELECT * FROM users");
        return users;
    }
    catch (error) {
        console.error("Error getting all users:", error);
        throw new Error("Failed to get all users");
    }
  }

}

module.exports = User;
