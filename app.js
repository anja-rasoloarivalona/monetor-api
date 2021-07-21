import express  from 'express'
import http from 'http'
import dotenv from 'dotenv'
import routes from './routes/index.js'

dotenv.config()

const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';

app.use(express.json({
    limit: "20mb"
}))

app.use(express.urlencoded({
    extended: true
}))

app.use('/', routes)

server.listen(port, host, console.log(`Server running on http://${host}:${port}.`));