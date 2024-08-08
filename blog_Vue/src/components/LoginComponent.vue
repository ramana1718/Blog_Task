<template>

    <div class=" flex justify-center">
      <div class="w-96 p-8 rounded-lg shadow-md mt-8">
        <div class="font-bold mb-4 ">
        <h3>WELCOME BACK, LOGIN HERE</h3></div>
    <form @submit.prevent="onlogin">
      <div class="mb-4">
      <input  class="w-full p-3 border border-teal-700 rounded" v-model="email"placeholder="Email" required/></div>

     <div> <input type="password"  class="w-full p-3 border border-teal-700 rounded" v-model="password" placeholder="Password" minlength="8" required/></div>

     <div class=" flex justify-center mt-4  bg-teal-500 p-3">
      <button class="">LOGIN</button>
     </div> 
     <span v-if="fPassError" class="text-red-500 text-sm">{{ fPassError}}</span>
     <span v-if="bPassError"  class="text-red-500 text-sm">{{ bPassError}}</span>

     <div class="">
     <a class="flex justify-end text-teal-500 underline mb-4" href=""> forgot password? </a>
     <div class="flex justify-center flex-row gap-2">
     Dont't have an account? <a class=" text-teal-500 underline flex justify-center" href="/register">  register here  </a></div>
    </div></form>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { UserDetailsStore } from '@/stores/user';
import { errors,validateEmail,validatePassword } from '@/utils/validation';
const email=ref("")
const password=ref("")
const loginerror=ref("")
const store=UserDetailsStore();
const fPassError=ref("")
const bPassError=ref("")

const onlogin=async()=>{
  validateEmail(email.value)
  validatePassword(password.value)
 if(!errors.value.password && !errors.value.email ){
    console.log("Logging");
    
  await store.login(email.value,password.value)
  console.log(email.value,password.value)
  fPassError.value=""
  bPassError.value=store.loginerror
}
  else{
    fPassError.value="Email or password format not correct"
    bPassError.value=""
  }

}

</script>
