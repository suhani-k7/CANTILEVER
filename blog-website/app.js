const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const path = require('path')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.json())

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(express.static(path.join(__dirname, 'dist')));

app.all('/{*any}', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

