const { hash } = require("bcryptjs");
class UserRepositoryInMemory {
  constructor() {
    this.users = [];
  }
  async create({ name, email, password, avatar }) {
    if (!avatar) {
      avatar = null;
    }
    const passwordHash = await hash(password, 8);
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      email,
      name,
      avatar,
      password: passwordHash,
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }

  async findById(id) {
    return this.users.find((user) => user.id === id);
  }

  async update(user, user_id) {
    const index = this.users.findIndex((user) => user.id === user_id);
    if (index !== -1 && user) {
      this.users[index] = { ...this.users[index], ...user };
    }
  }

  async updateAvatar(user) {
    const index = this.users.findIndex((user) => user.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return this.users[index];
  }

  async saveAvatar(avatarFilename) {
    return avatarFilename;
  }

  async deleteAvatar(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
module.exports = UserRepositoryInMemory;
