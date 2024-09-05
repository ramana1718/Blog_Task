import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api';
export const BlogDetailsStore = defineStore('Blog', () => {
const token=ref(localStorage.getItem('token'))
const allBlogs=ref([])
const ourBlogs=ref([])
const pageCount=ref(1);
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
    const categoryblog=async(category:string)=>{
      try{
        const url=`/CategoryBlogs/${category}`
        const response=await api.get(url,{
          headers:{Authorization:`Bearer ${token.value}`}
        })
        return response.data.data
      }
      catch(err){
        console.log(err)
      }
    }
    const updateBlog=async(blogid:string,title:string,category:string,content:string,)=>{
      console.log(blogid)
      try{
        const url=`/updateBlog/${blogid}`
        const response=await api.patch(url,{
          title:title,  
          content:content
        },{
          headers:{Authorization:`Bearer ${token.value}`}
        })
        return response.data.data
      }
      catch(err){
        console.log(err)
      }
    }
    const searchBlog=async(title:string)=>{
      try{
        const response=await api.get('/SearchBlog',
          {
            params:{
              title:title
            },headers:{Authorization:`Bearer ${token.value}`}},
      )
      console.log(response)
      return response.data.data
      }
      catch(err){
        console.log(err)
      }
    }
    const getUser=async(userid:number)=>{
      try{
        const url=`/findUser/${userid}`
        const response=await api.get(url,{
          headers:{Authorization:`Bearer ${token.value}`}
        })
        // console.log(response.data.data.name)
       let  username=response.data.data.name
        return username
      }catch(err){
        return err
      }
    }
    const paginate=async(page:Number=1)=>{
      try{
        const url=`/paginate/${page}`;
        const response=await api.get(url,{
          headers:{Authorization:`Bearer ${token.value}`}
        })
        pageCount.value=response.data.data.meta.last_page
        return response.data.data.data
      }catch(err){
        return err
      }

    }

    
      return{getBlogs,allBlogs,getourBlogs,ourBlogs,addBlog,deleteblog,categoryblog,updateBlog,searchBlog,getUser,paginate,pageCount}
})
