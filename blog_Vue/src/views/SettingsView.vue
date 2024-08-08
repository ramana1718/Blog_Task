<template>
    <div class="about">
      <h1>This is Settings page</h1>
      <h3>NAME : {{ UName }}</h3>
      <h3>EMAIL: {{  UEmail }}</h3>
    </div>
  </template>
  <script setup>
  import { UserDetailsStore } from '@/stores/user';
  import { ref } from 'vue';
  const store=UserDetailsStore();
  const UName=ref("")
  const UEmail=ref("")
  UName.value=store.UserName;
  UEmail.value=store.UserEmail;
  
  </script>