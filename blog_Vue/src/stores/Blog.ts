import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api';

export const BlogDetailsStore = defineStore('Blog', () => {
const token=ref(localStorage.getItem('token'))
const allBlogs=ref([])
const ourBlogs=ref([])
    const getBlogs = async () => {
        try {
          const response = await api.get('/viewall', {
            headers: { Authorization: `Bearer ${token.value}` },
          });
          console.log(response.data)
          allBlogs.value = response.data.data;
        } catch (error) {
          console.error(error);
        }
      };

    const getourBlogs=async(userid:number)=>{
        try{
            console.log(userid)
            const url=`/ourBlogs/${userid}`
            const response=await api.get(url,{
                headers:{Authorization:`Bearer ${token.value}`},
            })
            ourBlogs.value=response.data.data
            console.log(ourBlogs.value)
        }
        catch(err){
            console.log(err)
        }
    }
    const addBlog=async(userid:number,title:string,category:string,content:string )=>{
      try{
        const response=await api.post('/CreateBlogs',{
          userid:userid,
          title:title,
          category:category,
          content:content,
        },{
          headers:{Authorization:`Bearer ${token.value}`},
        })
      }catch(err){
        console.log(err)
      }
    }
    const deleteblog=async(blogid:Number)=>{
      try{
        const url=`/DeleteBlog/${blogid}`
        const response=await api.delete(url,{
          headers:{Authorization:`Bearer ${token.value}`}
        })

      }
      catch(err){
        console.log(err)
      }
    }
    
      return{getBlogs,allBlogs,getourBlogs,ourBlogs,addBlog,deleteblog}
})
