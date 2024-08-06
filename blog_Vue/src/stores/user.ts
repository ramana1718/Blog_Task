import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import api from "@/services/api";

export const UserDetailsStore = defineStore('user', () => {
  const router = useRouter();
  const loginerror = ref("");
  const name = ref("");
  const ourId = ref(0);

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

     
      name.value = response.data.obj.name;
      ourId.value = response.data.obj.id; 

      console.log('User ID:', ourId.value);
      router.push('/');
    } catch (err: any) {
      loginerror.value = "Username or Password is invalid";
      console.error('Login failed:', err.response.data);
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
      router.push('/login');
    } catch (err: any) {
      console.error('Registration failed:', err.response.data);
    }
  };

  return { login, loginerror, name, register, ourId };
});
