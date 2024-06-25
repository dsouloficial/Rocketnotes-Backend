const AppError = require("../../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../../configs/auth");
const { sign } = require("jsonwebtoken");
class SessionCreateService {
  constructor(sessionsRepository) {
    this.sessionsRepository = sessionsRepository;
  }

  async execute({ email, password }) {
    const user = await this.sessionsRepository.create(email);

    if (!user) {
      throw new AppError("Incorrect email or password", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorrect email or password", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}

module.exports = SessionCreateService;
