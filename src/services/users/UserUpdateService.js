const { hash, compare } = require("bcryptjs");
const AppError = require("../../utils/AppError");
class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password, old_password, user_id }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found!");
    }

    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("This E-mail already exist!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "You need put a old Password For change a new Password!"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("The old Password is not correct");
      }

      user.password = await hash(password, 8);
    }

    this.userRepository.update({ user, user_id });
    return user;
  }
}

module.exports = UserUpdateService;
