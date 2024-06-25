const { hash } = require("bcryptjs");
class SessionsRepositoryInMemory {
  constructor() {
    this.sessions = [];
  }

  async create(email) {
    const sessionsSearch = await this.sessions.find(
      (session) => session.email === email
    );

    return sessionsSearch;
  }

  async store({ email, password }) {
    const passwordHash = await hash(password, 8);
    const session = {
      email,
      password: passwordHash,
    };

    this.sessions.push(session);
    return session;
  }
}

module.exports = SessionsRepositoryInMemory;
