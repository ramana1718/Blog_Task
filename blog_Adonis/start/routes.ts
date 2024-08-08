/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/login','AuthController.login')
Route.post('/register','AuthController.register')
Route.where('userid',Route.matchers.number())
Route.where('blogid',Route.matchers.number())

Route.group(()=>{
    Route.get('/viewall','BlogsController.viewBlog')
    Route.get('/ourBlogs/:userid','BlogsController.OurBlogs')
    Route.get('/CategoryBlogs/:category','BlogsController.CategoryBlogs').where('category',Route.matchers.slug())
    Route.post('/CreateBlogs','BlogsController.CreateBlogs')
    Route.delete('/DeleteBlog/:blogid','BlogsController.DeleteBlog')
    Route.patch('/updateBlog/:blogid','BlogsController.UpdateBlog')
    Route.get('/SearchBlog','BlogsController.searchBlog')
    Route.get('/findUser/:userid','BlogsController.getUser')
}).middleware(['auth'])
