const express = require('express')
const {default : mongoose} = require('mongoose')
const cors = require('cors')
const userModel = require('./model')
const port = process.env.PORT || 6000


const CONN_URL = 'mongodb+srv://susanlharper01:grammy02@dashboard.sghxcad.mongodb.net/?retryWrites=true&w=majority&appName=Dashboard'
const app = express()


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended : false}))

app.use(express.static('public'))




app.get('/form', (req,res) => {
    res.sendFile(__dirname + 'public/index.html')
})

app.post('/formPost', async (req, res) => {
    try {
        const newUser = new userModel({
            email : req.body.email,
            password : req.body.password
        })
        const savedUser = await newUser.save()
        console.log(req.body)
        res.status(200).json({ message : "user added succesfully", data : savedUser})
    } catch(error){
        res.status(404).json({ message : error, message})
    }
})




mongoose.connect(CONN_URL).then(() => {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`)
    })
    console.log('database connected!')
}).catch((err) => {
    console.log(err.message)
})