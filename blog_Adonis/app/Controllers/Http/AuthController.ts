 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';
export default class AuthController {
    public async login({request,auth,response}:HttpContextContract){
        try {
            const email = request.input("email");
            const password = request.input("password");
           
            console.log(email,password);
            
            const token = await auth.use("api").attempt(email, password);
            if(token){
                 const obj=await User.findBy('email',email)
                 console.log(obj)
                 return {token,obj}
            }
           
        }
        catch (err) {
            response.status(500);
            return err
        }
    }

    public async register({ auth, request, response }: HttpContextContract) {
        console.log("oidhf")
        try {
            const payload=await request.validate(UserValidator)
            const user = await User.create(request.body());
            const token = auth.login(user)
            return token;
        }
        catch (err) {
            console.log('oi')
            response.status(500);
            console.log(err)
            return err;
        }
    }
}
