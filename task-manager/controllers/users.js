const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { request } = require('express')

usersRouter.get('/:id', async(request,response) => {
  const user = await User.findById(request.params.id)
  response.json(user)
})

usersRouter.post('/', async(request,response) => {
  const { username, password } = request.body

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username:username,
    password:passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter