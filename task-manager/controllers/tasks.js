const tasksRouter = require('express').Router()
const Task = require('../models/task')

tasksRouter.get('/', async (request,response) => {
  const tasks = await Task.find({})
  response.json(tasks)
})

tasksRouter.post('/', async (request,response) => {
  const body = request.body

  const user = request.user

  const task = new Task({
    text: body.text,
    done: body.done,
    description: body.description,
    dueDate: body.dueDate,
    priority: body.priority,
    user: user._id,
  })

  if (!task.text) {
    response.status(400).json({error:"text required"}).end()
  }

  const savedTask = await task.save()

  user.tasks = user.tasks.concat(savedTask._id)
  await user.save()

  response.status(201).json(savedTask)

})

tasksRouter.delete('/:id', async (request, response) => {
  const taskToDelete = await Task.findById(request.params.id)
  const user = request.user

  if (user._id.toString()==taskToDelete.user.toString()) {
    await Task.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  return response.status(404).end()
})

tasksRouter.put('/:id', async (request, response) => {
  const taskToEdit = await Task.findById(request.params.id);
  if (!taskToEdit) {
    return response.status(404).end();
  }

  const user = request.user;
  const body = request.body;

  if (user._id.toString() === taskToEdit.user.toString()) {
    taskToEdit.text = body.text;
    taskToEdit.description = body.description;
    taskToEdit.dueDate = body.dueDate;
    taskToEdit.priority = body.priority;
    taskToEdit.done = body.done;

    const updatedTask = await taskToEdit.save();
    return response.status(200).json(updatedTask);
  }

  return response.status(403).json({ error: "Unauthorized" });
});

module.exports = tasksRouter