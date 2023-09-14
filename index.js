import express from 'express'
import connection from './db.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import PropertyRoutes from './routes/propertyRoutes.js'
import NewsRoutes from './routes/NewsRoutes.js'
import ContactRoutes from './routes/ContactRoutes.js'

const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json())

const port = 8080

connection()

app.get('/', (req, res) => {
    res.status(200).send("home")
})

app.use("/api/post",PropertyRoutes)
app.use("/api/news",NewsRoutes )
app.use("/api/contact",ContactRoutes )

app.listen(port, () => {
    console.log(`server connected to http://localhost:${port}`)
})