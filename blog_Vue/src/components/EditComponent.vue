<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <form @submit.prevent="handleSubmit">
       <div class="mb-4 mt-4">
         <select 
           class="w-full border border-teal-500 rounded p-2" 
           v-model="category">
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

         />
       </div>
       <div class="mb-4">
         <textarea 
           class="w-full h-28 border border-teal-500 rounded p-2" 
           placeholder="Content" 
           v-model="content" 
         ></textarea>
       </div>
     
  
        <div class="flex justify-end space-x-4 mt-4">
          <button @click="$emit('cancelEdit')" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
          <button @click="$emit('updateEdit')" class="bg-teal-600 text-white p-2 rounded">Update</button>
        </div> </form>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>