<template>
    <div class=" flex justify-center">
    <div class="w-96 p-8 rounded-lg shadow-md mt-8">
      <div class="font-bold mb-4 ">
      <h3>WELCOME, REGISTER HERE</h3></div>
  <form @submit.prevent="registerUser">
    <div class="mb-4">
    <input class="w-full p-3 border border-teal-700 rounded" v-model="userName"placeholder="Username" required/></div>
   <div class="mb-4"> <input @input="validateEmail(email)" class="w-full p-3 border border-teal-700 rounded" v-model="email" placeholder="Email" required/>
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
  </div>
   <div class="mb-4"> <input type="password" @input="validatePassword(password)" class="w-full p-3 border border-teal-700 rounded" v-model="password" placeholder="Password" minlength="8" required/>
   <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
  </div>
   <div> <input type="password" @input="cpassCheck(password,cpassword)" class="w-full p-3 border border-teal-700 rounded" v-model="cpassword" placeholder="Confirm Password" minlength="8" required/>
  <span v-if="cpassError" class="text-red-500 text-sm">{{ cpassError }}</span>

  </div>
  <span v-if="InvalidDetails" class="text-red-500 text-sm">{{ InvalidDetails }}</span>
   <div class=" flex justify-center mt-4  bg-teal-500 p-3">
    <button class="">REGISTER</button></div><div class="flex justify-center">
    <span v-if="bRegisterError" class="text-red-500 text-sm">{{ bRegisterError }}</span>
    
   </div> 
   <div class="">
   <div class="flex justify-center flex-row gap-2">
   Already have an account? <a class=" text-teal-500 underline flex justify-center" href="/login">  login here  </a></div>
  </div></form>
</div>
</div>
</template>
<script setup>
import { ref } from 'vue';
import { errors, validatePassword,validateEmail } from '@/utils/validation';
import { UserDetailsStore } from '@/stores/user';

const userName=ref("")
const email=ref()
const password=ref("")
const cpassword=ref("")
const cpassError=ref("")
const store=UserDetailsStore();
const InvalidDetails=ref("");
const bRegisterError=ref("")
const cpassCheck=(password,cpassword)=>{
if(password!==cpassword){
  cpassError.value="Password does not match"
}
else{
  cpassError.value=""
}
}
const isCorrect=()=>{
    console.log("correct")
return ( !errors.value.email && !errors.value.password && !cpassError.value)
}
const emit= defineEmits(['registerUser'])
const registerUser=async()=>{
 if(isCorrect()){
await store.register(email.value,password.value,userName.value)
 bRegisterError.value=store.bRegisterError;
 console.log(bRegisterError.value)
 InvalidDetails.value=""
}
else{
  InvalidDetails.value="provide valid details"
  bRegisterError.value=""
}
}

</script>