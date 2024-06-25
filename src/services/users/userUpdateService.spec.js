const UserUpdateService = require("./userUpdateService");
const AppError = require("../../utils/AppError");
const UserRepositoryInMemory = require("../../repositories/UserRepositoryInMemory");

describe("userUpdateService", () => {
  let userRepositoryInMemory = null;
  let userUpdateService = null;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userUpdateService = new UserUpdateService(userRepositoryInMemory);
  });

  it("Atualizar usuário", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreate = await userRepositoryInMemory.create(user);

    const userUpdated = await userUpdateService.execute({
      user_id: userCreate.id,
      name: "User Test Updated",
      email: "user@test.com",
      old_password: "123",
      password: "456",
    });

    const userUpdatedResult = await userRepositoryInMemory.findById(
      userCreate.id
    );

    await expect(userUpdatedResult.name).toEqual(userUpdated.name);
    await expect(userUpdatedResult.email).toEqual(userUpdated.email);
    await expect(userUpdatedResult.password).toEqual(userUpdated.password);
  });

  it("Atualizar usuário com senha errada", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreate = await userRepositoryInMemory.create(user);

    await expect(
      userUpdateService.execute({
        user_id: userCreate.id,
        name: "User Test Updated",
        email: "user@test.com",
        old_password: "999",
        password: "456",
      })
    ).rejects.toEqual(new AppError("The old Password is not correct"));
  });

  it("Atualizar usuário com email existente", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };
    const user2 = {
      name: "User Test",
      email: "user2@test.com",
      password: "123",
    };

    const userCreate = await userRepositoryInMemory.create(user);
    const userCreate2 = await userRepositoryInMemory.create(user2);

    await expect(
      userUpdateService.execute({
        user_id: userCreate.id,
        name: "User Test Updated",
        email: "user2@test.com",
        old_password: "123",
        password: "456",
      })
    ).rejects.toEqual(new AppError("This E-mail already exist!"));
  });

  it("Atualizar usuário sem informar senha", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    const userCreate = await userRepositoryInMemory.create(user);

    await expect(
      userUpdateService.execute({
        user_id: userCreate.id,
        name: "User Test Updated",
        email: "user@test.com",
        password: "456",
      })
    ).rejects.toEqual(
      new AppError("You need put a old Password For change a new Password!")
    );
  });

  it("Atualizar usuário inválido", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123",
    };

    await userRepositoryInMemory.create(user);

    await expect(
      userUpdateService.execute({
        user_id: "5",
        name: "User Test Updated",
        email: "user@test.com",
        password: "456",
      })
    ).rejects.toEqual(new AppError("User not found!"));
  });
});
