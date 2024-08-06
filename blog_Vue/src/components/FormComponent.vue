<template>
    <div class="flex-col justify-center mt-10 border p-10 rounded shadow-md">
      <h1 class="font-bold">Add the blog content here</h1>
      <form @submit.prevent="handleSubmit">
       
        <div class="mb-4 mt-4">
          <select 
            class="w-full border border-teal-500 rounded p-2" 
            v-model="category" 
            required
          >
            <option value="" disabled>Select a category</option>
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
        </div>
        <div class="mb-4 ">
          <input 
            class="w-full border border-teal-500 rounded p-2" 
            placeholder="Title" 
            v-model="title" 
            required
          />
        </div>
        <div class="mb-4">
          <textarea 
            class="w-full h-28 border border-teal-500 rounded p-2" 
            placeholder="Content" 
            v-model="content" 
            required
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button class="bg-teal-500 p-2 rounded text-white">POST</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { BlogDetailsStore } from '@/stores/Blog';
  import { UserDetailsStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  const router=useRouter();
  const title = ref('');
  const category = ref('');
  const content = ref('');
  const store=BlogDetailsStore();
  const userid=ref(0)
  const userStore=UserDetailsStore();
  userid.value=userStore.ourId
  const handleSubmit = () => {
    console.log(userid.value,title.value,content.value,category.value)
    store.addBlog(userid.value,title.value,category.value,content.value);
    router.push('/home')
  };
  </script>
  