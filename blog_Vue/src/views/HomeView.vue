

<template>
  <!-- <div class="flex justify-end">
    <button class=" text-white bg-teal-600 p-3 m-4 rounded justify-end" onclick=""> Add Blog</button>
  </div> -->
  <div class="">
      
  <div  class="ml-36 mr-48 border shadow-sm p-5 mb-4 rounded" v-for="(row,index) in data" :key="index">
    <h2 class="mt-4 font-bold text-3xl"> {{ row.title }}</h2>
    <h2 class="font-bold">(Category: {{ row.category }})</h2>
   <br> <h2 class="font-bold">CONTENT: </h2>
    <h2><h2>
      <br>
    </h2 class="mb-4">{{ row.content }}</h2>
  </div></div>

</template>
<script setup>

import { BlogDetailsStore } from '@/stores/Blog';
import { ref } from 'vue';
const store=BlogDetailsStore();
const data=ref("")
data.value=store.allBlogs;
store.getBlogs();

</script>