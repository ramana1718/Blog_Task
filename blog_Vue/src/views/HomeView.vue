

<template>

  <div class="">
    <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg> -->

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
           <option value="Employee">Employee</option>
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
    </h2 class="text-xl mb-4">{{ row.content }}</h2><br>
    <div>
      <h1 class="text-teal-500">{{ row.tags}}</h1>
    </div>
    <div class="flex justify-end">
      <h3 >BLOG BY: {{ row.name}}</h3>
    </div>
    
  </div>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="5">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :length="totalpage"
              class="my-4"
              @click="pageData(page)"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div></div>

</template>
<script setup>

import { BlogDetailsStore } from '@/stores/Blog';
import { onMounted, ref, watch ,} from 'vue';
const searchText=ref("")
const store=BlogDetailsStore();
const page=ref(1)
const category=ref("")
const data=ref([])
const totalpage=ref(1)
// const paginatefunc=(page)=>{
//   window.location.reload()
//   console.log(page)
// }
watch(category, async(newv,oldv)=>{
     data.value=await store.categoryblog(newv)
    console.log(data.value)
  console.log(newv)
})
 
const userName=async()=>{
  data.value = await Promise.all(data.value.map(async(ele)=>{
  const userName = await store.getUser(ele.userid);
  const obj = {
    ...ele,
    name:userName
  }
  return obj
}))
}
const pageData=async(page)=>{
  data.value=  await store.paginate(page);
  await userName();
}
onMounted( async()=>{
await pageData(1);
 totalpage.value=store.pageCount
 await userName();
} 




)
const searchTitle=async()=>{
  if(searchText.value!==''){
    console.log(searchText.value)

console.log(searchText.value);

    data.value=await store.searchBlog(searchText.value)
  }
  else{
    
    window.location.reload()
  }
}
//  })
//  watch(searchText, async(newv,oldv)=>{
// const nameval = async (userid)=>{
//   let Uname=await store.getUser(userid)
//   // console.log("name : ", Uname);
  
//   return Uname;
// }
// const findUser = async (userid) => {
//   let y =  await nameval(userid);
//   console.log(await nameval(userid));
//   return y
// };

</script>