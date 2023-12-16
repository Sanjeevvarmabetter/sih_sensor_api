const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Iot = require('./models/sensormodels')

//middleware

app.use(express.json())



//routes

app.get('/', (req,res) => {
    res.send("hello")
})
app.get('/iot', (req,res) => {
    res.send("hello")
})


app.listen(3000, ()=> {
    console.log("bye")
})



app.post('/iotsensors' , async(req,res) => {
    try { 
        const io = await Iot.create(req.body)
        res.status(200).json(io);

    }catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery",false)


mongoose.connect('mongodb+srv://varma:sprucedev@cluster0.dsdwr3i.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})