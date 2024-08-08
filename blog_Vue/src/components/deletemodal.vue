<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this employee?</p>
        <div class="flex justify-end space-x-4 mt-4">
          <button @click="$emit('cancel')" class="bg-gray-500 text-white p-2 rounded">Cancel</button>
          <button @click="$emit('confirm')" class="bg-teal-600 text-white p-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  