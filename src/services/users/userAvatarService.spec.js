const UserAvatarService = require("./UserAvatarService");
const AppError = require("../../utils/AppError");
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory");

describe("userAvatarService", () => {
  let userRepositoryInMemory = null;
  let userAvatarService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userAvatarService = new UserAvatarService(userRepositoryInMemory);
  });

  it("Buscar pelo usuário inexistente", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreate = await userRepositoryInMemory.create(user);
    const findUser = await userRepositoryInMemory.findById(userCreate.id);

    await expect(
      userAvatarService.execute({ id: "dfdsfsfsdfsdfsd" })
    ).rejects.toEqual(new AppError("Unauthenticated user", 404));
  });

  it("Atualização do avatar", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
      avatar: "teste.png",
    };

    const userCreate = await userRepositoryInMemory.create(user);
    const findUser = await userRepositoryInMemory.findById(userCreate.id);

    const idAvatar = findUser.id;
    const avatarFilename = "teste2.png";
    const userAvatarUpdate = await userAvatarService.execute(
      idAvatar,
      avatarFilename
    );

    expect(userAvatarUpdate.user.avatar).toBe("teste2.png");
  });

  it("Enviando avatar vazio", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
      avatar: "teste.png",
    };

    const userCreate = await userRepositoryInMemory.create(user);
    const findUser = await userRepositoryInMemory.findById(userCreate.id);

    const idAvatar = findUser.id;
    const avatarFilename = undefined;

    await expect(
      userAvatarService.execute(idAvatar, avatarFilename)
    ).rejects.toEqual(new AppError("Avatar not found", 404));
  });
});
