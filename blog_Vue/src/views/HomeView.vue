

<template>

  <div class="">
    
    <div class="flex justify-end pr-20 mr-20 w-full mt-4">
      <div class="p-5">
      <input
      v-model="searchText"
      @input="searchTitle()"
      type="text"
      placeholder="Search Title here..."
      class="border border-teal-500 p-1 rounded"/></div>
      <div class="p-4">
         <select 
           class="w-full border border-teal-500 rounded p-2" 
           v-model="category">
           <option value="" disabled selected>All Category</option>
           <option value="sport">Sport</option>
           <option value="politics">Politics</option>
           <option value="world">World</option>
           <option value="studies">Studies</option>
           <option value="woman">Woman</option>
           <option value="child">Child</option>
           <option value="employee">Employee</option>
           <option value="money">Money</option>
           <option value="stockMarket">Stock Market</option>
         </select>
       </div></div>

  <div  class="ml-48 mr-56 border shadow-sm p-5 mb-4 mt-4 rounded " v-for="(row,index) in data" :key="index">
    <h2 class="mt-4 font-bold text-3xl"> {{ row.title }}</h2>
    <h2 class="font-bold">(Category: {{ row.category }})</h2>
   <br> <h2 class="font-bold">CONTENT: </h2>
    <h2><h2>
      <br>
    </h2 class="text-xl mb-4">{{ row.content }}</h2>
    <div>
      <h3 > BY: {{ findUser(row.userid) }}</h3>
    </div>
  </div></div>

</template>
<script setup>

import { BlogDetailsStore } from '@/stores/Blog';
import { onMounted, ref, watch , computed} from 'vue';
const searchText=ref("")
const store=BlogDetailsStore();
const category=ref("")
const data=ref("")
const name=ref("")
console.log("HI"+category.value)
watch(category, async(newv,oldv)=>{
  
     data.value=await store.categoryblog(newv)
    console.log(data.value)
  
  console.log(newv)
})
 
onMounted(async()=>{
await store.getBlogs();
data.value=  store.allBlogs;
})
const searchTitle=async()=>{
 console.log(searchText.value)
//  watch(searchText, async(newv,oldv)=>{
  console.log(searchText.value);
  
      data.value=await store.searchBlog(searchText.value)}
//  })
 
const nameval = async (userid)=>{
  let Uname=await store.getUser(userid)
  console.log("name : ", Uname);
  
  return Uname;
}
const findUser = async (userid) => {
  let y =  await nameval(userid);
  console.log(y);
  return y
};

</script>