import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import env from "dotenv"
const mySqlPool = require('./Config/Db');
const router = require('./Rotes/UserRoute')
const router2 = require('./Rotes/CategoryRouter')

const app = express()
 
app.use(cors({ credentials: true, }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())
 
env.config()

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

})

// mySql connection 
mySqlPool.query('SELECT 1').then(()=>{
    console.log("MySql Db Connected");
    
}) 

app.use('/user',router)
app.use('/admin',router2)