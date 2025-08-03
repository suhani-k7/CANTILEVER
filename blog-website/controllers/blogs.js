const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json((blogs))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.get('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  response.json((blog))
})

blogsRouter.put('/:id', async (request,response) => {
  const blogToEdit = await Blog.findById(request.params.id);
    if (!blogToEdit) {
      return response.status(404).end();
    }
  
    const user = request.user;
    const body = request.body;
  
    if (user._id.toString() === blogToEdit.user.toString()) {
      blogToEdit.title = body.title;
      blogToEdit.body = body.body;
      blogToEdit.author = body.author;
      blogToEdit.id = body.id;
      blogToEdit.user = body.user;
  
      const updatedBlog = await blogToEdit.save();
      return response.status(200).json(updatedBlog);
    }
  
    return response.status(403).json({ error: "Unauthorized" });
})

module.exports = blogsRouter