const SessionsRepositoryInMemory = require("../../repositories/SessionsRepositoryInMemory");
const SessionCreateService = require("./SessionCreateService");
const AppError = require("../../utils/AppError");

describe("SessionCreateService", () => {
  let sessionsRepositoryInMemory = null;
  let sessionCreateService = null;

  beforeEach(() => {
    sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
    sessionCreateService = new SessionCreateService(sessionsRepositoryInMemory);
  });

  it("Criação da seção", async () => {
    const user = {
      email: "test@gmail.com",
      password: "123",
    };

    const createUser = await sessionsRepositoryInMemory.store(user);

    const session = await sessionCreateService.execute({
      email: createUser.email,
      password: user.password,
    });

    expect(session).toHaveProperty("token", "email", "password");
  });

  it("Criação da seção com email inválido", async () => {
    const user = {
      email: "test@gmail.com",
      password: "123",
    };

    const createUser = await sessionsRepositoryInMemory.store(user);

    await expect(
      sessionCreateService.execute({
        email: "test2@gmail.com",
        password: user.password,
      })
    ).rejects.toEqual(new AppError("Incorrect email or password", 401));
  });

  it("Criação da seção com senha invalida", async () => {
    const user = {
      email: "test@gmail.com",
      password: "123",
    };

    const createUser = await sessionsRepositoryInMemory.store(user);

    await expect(
      sessionCreateService.execute({
        email: createUser.email,
        password: "456",
      })
    ).rejects.toEqual(new AppError("Incorrect email or password", 401));
  });
});
