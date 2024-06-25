const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserAvatarService = require("../services/users/UserAvatarService");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const userRepository = new UserRepository();
    const userAvatarService = new UserAvatarService(userRepository);

    let avatarFilename;
    //atenção verificar se está impedindo a atualização do perfil.
    if (!request.file) {
      throw new AppError("File not found");
    } else {
      avatarFilename = request.file.filename;
    }

    const userAvatarUpdate = await userAvatarService.execute(
      user_id,
      avatarFilename
    );

    return response.json(userAvatarUpdate);
  }
}

module.exports = UserAvatarController;
