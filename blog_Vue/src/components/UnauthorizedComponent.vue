<template>
    <div class="not-found">
      <h1>401 - Unauthorized </h1>
      <p>Login or Register to view the content of the page</p>
      <div class="text underline text-teal-500"><router-link to="/login">Go to Login/Register</router-link></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  