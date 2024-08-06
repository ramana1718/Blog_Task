<template>

    <div class=" flex justify-center">
      <div class="w-96 p-8 rounded-lg shadow-md mt-8">
        <div class="font-bold mb-4 ">
        <h3>WELCOME BACK, LOGIN HERE</h3></div>
    <form @submit.prevent="onlogin">
      <div class="mb-4">
      <input class="w-full p-3 border border-teal-700 rounded" v-model="email"placeholder="Email" required/></div>
     <div> <input type="password"  class="w-full p-3 border border-teal-700 rounded" v-model="password" placeholder="Password" minlength="8" required/></div>
     <div class=" flex justify-center mt-4  bg-teal-500 p-3">
      <button class="">LOGIN</button>
     </div> 
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
const email=ref("")
const password=ref("")
const loginerror=ref("")
const store=UserDetailsStore();

loginerror.value=store.loginerror
const onlogin=()=>{
  store.login(email.value,password.value)
  console.log(email.value,password.value)

}

</script>
