const AppError = require("../../utils/AppError");
class UserAvatarService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user_id, avatarFilename) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("Unauthenticated user", 404);
    }

    if (!avatarFilename) {
      throw new AppError("Avatar not found", 404);
    }

    if (user.avatar) {
      await this.userRepository.deleteAvatar(user.avatar);
    }

    const filename = await this.userRepository.saveAvatar(avatarFilename);
    user.avatar = filename;

    const updateAvatar = await this.userRepository.updateAvatar({
      user_id,
      user,
    });
    return updateAvatar;
  }
}
module.exports = UserAvatarService;
