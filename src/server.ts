import express from 'express'
import router from './routes/index'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(bodyParser.json())
const port = process.env.PORT ?? 3030
const host = process.env.HOST ?? '127.0.0.1'
app.use(
  cors({
    credentials: true,
    origin: true
  })
)
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:5173'
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,PATCH,POST,DELETE,OPTIONS'
  )
  next()
})
app.get('/', (request, response) => {
  response.type('text/plain')
  response.send('Server is running')
})
app.use(router)
app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}; press ctrl + c to terminate`)
})
