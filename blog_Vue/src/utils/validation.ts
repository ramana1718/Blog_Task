import { ref, computed } from 'vue'

export const errors = ref({
  password:'',
  email:''
})

export const validatePassword=(password:string)=>{
  const passRegex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/
  errors.value.password=passRegex.test(password)?"":"Password is weak. Should be alteast of length 8 and contain atleast one special character, one capital letter,one small letter and one number"
}
export const validateEmail=(email:string)=>{
  const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  errors.value.email=emailregex.test(email)?"":"Invalid email"
}

export const isValid = computed(() => {
  return !errors.value.password && !errors.value.email;
})
