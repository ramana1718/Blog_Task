import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import api from "@/services/api";

export const UserDetailsStore = defineStore('user', () => {
  const router = useRouter();
  const loginerror = ref("");
  const name = ref("");
  const ourId = ref(0);
  const bRegisterError=ref("")
  const UserName=ref("")
  const UserEmail=ref("")

  const login = async (email: string, password: string) => {
    console.log("Logging in with email: " + email);
    try {
      const response = await api.post('/login', {
        email: email,
        password: password
      });
      console.log(response.data);

      const token = response.data.token.token;
      localStorage.setItem('token', token);
      localStorage.setItem('userid',response.data.obj.id)
      name.value = response.data.obj.name;
      ourId.value = response.data.obj.id; 

      UserName.value=response.data.obj.name;
      UserEmail.value=response.data.obj.email;
      console.log(UserName.value)
      console.log(UserEmail.value)

      router.push('/');
    } catch (err) {
      
      if( err.response.data.responseText){
        loginerror.value = "Username or Password is invalid";
      }
      console.log(loginerror.value)
    }
  };

  const register = async (email: string, password: string, userName: string) => {
    try {
      const response = await api.post('/register', {
        email: email,
        password: password,
        name: userName
      });
      localStorage.setItem('token', response.data.token);
      bRegisterError.value=''
      router.push('/login');
    } catch (err) {
      console.error('Registration failed:', err.response.data.code);
      if(err.response.data.code==="ER_DUP_ENTRY"){
        bRegisterError.value="email already exists please change your email"
        console.log(bRegisterError.value)
      }
    }
  };
  const OurDetails=async(name:string,email:string)=>{

  }

  return { login, loginerror, name, register, ourId, bRegisterError,UserEmail,UserName };
});
