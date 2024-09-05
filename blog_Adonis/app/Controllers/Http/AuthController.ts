import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import UserValidator from "App/Validators/UserValidator";
import LoginValidator from "App/Validators/LoginValidator";
export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    try {
      const payload: any = await request.validate(LoginValidator);
      const email = payload.email;
      const password = payload.password;

      console.log(email, password);

      const token = await auth.use("api").attempt(email, password);
      if (token) {
        const obj = await User.findBy("email", email);
        console.log(obj);
        return response
          .status(200)
          .json({ message: "success", token: token, obj: obj });
      }
    } catch (err) {
      response.status(500);
      return response
        .status(400)
        .json({ message: "an error occured", error: err });
    }
  }

  public async register({ auth, request, response }: HttpContextContract) {
    console.log("oidhf");
    try {
      const payload: any = await request.validate(UserValidator);
      const user = await User.create(payload);
      const token = auth.login(user);
      return response.status(200).json({ message: "Success", token: token });
    } catch (err) {
      console.log("oi");
      response.status(500);
      console.log(err);
      return response
        .status(400)
        .json({ message: "an error occured", error: err });
    }
  }
}
