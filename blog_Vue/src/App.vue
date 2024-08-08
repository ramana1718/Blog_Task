

<template>
<h1 class="text-4xl flex justify-end bg-teal-600 p-4">BLOG PLATFORM</h1>

     <div class="flex justify-end gap-28 text-xl p-3 bg-teal-500">
      
       <h3><RouterLink to="/">All</RouterLink></h3> 
        <h3><RouterLink to="/OurPosts">Our Posts</RouterLink></h3>
        <h3><RouterLink to="/form">Add Blog</RouterLink></h3>
        <h3><RouterLink to="/settings">Settings</RouterLink></h3>
       <h3><RouterLink to="/about">About</RouterLink></h3>
       <div v-show="!loggedIn" class="underline text-lg">
      <a href="/login"><h1>LOGIN/REGISTER</h1></a>
    </div>
    <div v-show="loggedIn" class="underline text-lg">
     <a @click="handleLogout()"> <h1>LOGOUT</h1></a>
    </div> 

</div>
  
  <RouterView />
  
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue';
const loggedIn=ref(false)
const localdata = ref(localStorage)

watch(localdata, ()=>{
  console.log(localStorage.getItem("token"))
  if(localStorage.getItem("token")){
     loggedIn.value=!loggedIn.value;
  }

},{ immediate : true});

const handleLogout = () => {
  localStorage.clear();
  sessionStorage.clear();
  location.href="/login";
}
</script>


