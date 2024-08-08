

<template>
    <div class="text-teal-600">
        </div>
    <div  class="ml-36 mr-48 border shadow-sm mb-4 p-5 rounded" v-for="(row,index) in data" :key="index">
      <h2 class="mt-4 font-bold text-3xl"> {{ row.title }}</h2>
      <h2 class="font-bold">(Category: {{ row.category }})</h2>
     <br> <h2 class="font-bold">CONTENT: </h2>
      <h2><h2>
        <br>
        <EditComponent v-if="showEditModal" :blogid="cblogid" :title="ctitle" :category="ccategory" :content="ccontent"  @cancelEdit="cancelEdit" @updateEdit="updateEdit()"/>
        <DeleteModal v-if="showDeleteModal" @confirm="deleteblog" @cancel="cancelDelete" />

      </h2 class="mb-4">{{ row.content }}</h2>

      <div class="flex justify-end gap-6 text-white">
        <button @click="showEditComponent(row)"  class="bg-teal-500 p-2 rounded">Edit</button>
        <button @click="confirmdelete(row.blogid)" class="bg-teal-500 p-2 rounded">Delete</button></div>
    
    
    </div>
    
  
  </template>
  <script setup>
  import EditComponent from '@/components/EditComponent.vue';
  import { BlogDetailsStore } from '@/stores/Blog';
  import DeleteModal from '@/components/deletemodal.vue';
  // import { UserDetailsStore } from '@/stores/user';
  import { onMounted, ref } from 'vue';
  const showEditModal=ref(false);
  const showDeleteModal = ref(false);

  // const userstore=UserDetailsStore();
  const userid=ref(0);
  userid.value =localStorage.getItem('userid')
  const store=BlogDetailsStore();
let  cblogid=ref(0);
const ctitle=ref("")
const ccategory=ref("")
const ccontent=ref("")
const deletblogid=ref(0);
  const data=ref([])
  onMounted(async()=>{
    await store.getourBlogs(userid.value);
    data.value=store.ourBlogs;
  })

  console.log(data.value)
  const confirmdelete=async(blogid)=>{
    showDeleteModal.value=true;
    deletblogid.value=blogid;
    console.log(deletblogid.value)

  }
  const deleteblog=async()=>{
    await store.deleteblog(deletblogid.value);
    showDeleteModal.value=false
    window.location.reload()
  }
  const showEditComponent=(row)=>{
    showEditModal.value=true;
    console.log(row.blogid)
    cblogid.value=row.blogid;
    ctitle.value=row.title;
    ccontent.value=row.content;
    ccategory.value=row.category;
    console.log(cblogid.value,ctitle.value,ccategory.value,ccontent.value)

  }
 const cancelEdit=()=>{
  showEditModal.value=false;
 }
 const updateEdit=()=>{
showEditModal.value=false;
window.location.reload()
 }
 const cancelDelete = () => {
  showDeleteModal.value = false;
  deleteblog.value = null;
};
  </script>