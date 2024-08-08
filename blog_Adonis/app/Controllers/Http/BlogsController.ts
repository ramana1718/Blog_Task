import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blogpost from 'App/Models/Blogpost'
import User from 'App/Models/User';
export default class BlogsController {

    public async viewBlog({response}:HttpContextContract){
        try{const data=await Blogpost.all();
        return response.status(200).json({message:'successfully fetched',data:data})}
        catch(err){
            return response.status(500).json({Message:'an error occured', error:err})
        }

    }
    public async CreateBlogs({request,response}:HttpContextContract){
        
        try{
          const data=request.body();
          if(Object.keys(data).length===0){
            return response.status(400).json({message:"No data to update"})
          }
          const insertedRows=await Blogpost.create(data);
          console.log(insertedRows);
          return response.status(200).json({message:"successfully inserted",data:insertedRows})
        }
        catch(err){
          return response.status(500).json({message:'an error occured',error:err})
        }
    }
    public async OurBlogs({params,response}:HttpContextContract){
        try{
            const userid=params.userid;
            const data=await Blogpost.query().where('userid',userid)
            console.log(data)
            return response.status(200).json({message:'successfully fetched',data:data})
        }
        catch(err){
            return response.status(500).json({Message:'an error occured',error:err})
        }
    }
  
      public async CategoryBlogs({ params, response }: HttpContextContract) {
        try {
          const category = params.category;
          const data = await Blogpost.query().where('category', category);
          console.log(data);
          return response.status(200).json({ Message: 'Successfully fetched', data: data });
        } catch (err) {
          return response.status(500).json({ Message: 'An error occurred', error: err.message });
        }
      }
      public async DeleteBlog({params,response}:HttpContextContract){
        try{
          const blogid=params.blogid;
          const blog=await Blogpost.findOrFail(blogid);
          await blog.delete();
          return response.status(200).json({message:'Deletion successfull',data:blog})
        }
        catch(err){
          return response.status(500).json({message:'An error occured',error:err})
        }
      }
      public async UpdateBlog({params,request,response}:HttpContextContract){
          const blogid=params.blogid;
          const updatedata=request.body();
          if(Object.keys(updatedata).length===0){
            return response.status(400).json({message:"No data to update"})
          }
          try{
          const updated=await Blogpost.updateOrCreate({blogid},updatedata)
          return response.status(200).json({message:'updation successfull',data:updated})
        }
        catch(err){
          return response.status(500).json({message:'an error occured',error:err})

        }
      }
      public async searchBlog({ request, response }: HttpContextContract) {
        const query = request.input('title')
    
        if (!query) {
          return response.status(400).json({ message: 'Query parameter is required' })
        }

        console.log(query);
        
    
        try {
          const blogs = await Blogpost.query()
            .where('title', 'like', `%${query}%`)
          
          return response.status(200).json({ message: 'Successfully fetched', data: blogs })
        } catch (err) {
          return response.status(500).json({ message: 'An error occurred', error: err.message })
        }
      }
      public async getUser({params,response}:HttpContextContract){
        const userid=params.userid;
        try{
          const udata=await User.findByOrFail('id',userid)
          return response.status(200).json({message:"successfully fetched ", data:udata})
        }catch(err){
          return response.status(500).json({message:'an error occured',error:err})
        }
      }
    }
    

