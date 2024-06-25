const sqliteConnection = require("../database/sqlite");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);

    return user;
  }

  async create({ name, email, password }) {
    const database = await sqliteConnection();
    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return { id: userId };
  }

  async findById(user_id) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    return user;
  }

  async update({ user, user_id }) {
    const database = await sqliteConnection();
    const sendUpdate = await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME ('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return sendUpdate;
  }

  async updateAvatar({ user_id, user }) {
    const updateUserAvatar = await knex("users")
      .update(user)
      .where({ id: user_id });
    return updateUserAvatar;
  }

  async saveAvatar(avatarFilename) {
    const diskStorage = new DiskStorage();
    const avatar = await diskStorage.saveFile(avatarFilename);
    return avatar;
  }

  async deleteAvatar(avatarFilename) {
    const diskStorage = new DiskStorage();
    const avatar = await diskStorage.deleteFile(avatarFilename);
    return avatar;
  }
}

module.exports = UserRepository;
