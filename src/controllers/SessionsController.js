const SessionsRepository = require("../repositories/SessionsRepository");
const SessionCreateService = require("../services/sessions/SessionCreateService");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;
    const sessionsRepository = new SessionsRepository();
    const sessionCreateService = new SessionCreateService(sessionsRepository);
    const sessionResult = await sessionCreateService.execute({
      email,
      password,
    });

    return response.json(sessionResult);
  }
}
module.exports = SessionController;
