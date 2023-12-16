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
    console.log("hello from Spruce Dev")
})

const sensorDateSchema = new mongoose.Schema({
    distance: Number,
    timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model('SensorData',sensorDateSchema)


app.post('/senddata', (req,res) => {
    const { distance } =req.body;
    const sensorData = new SensorData( {distance});


    sensorData.save()
    .then(() => {
        res.status(201).send('data saved ');
    })
    .catch(error => {
        console.error(error);
        res.status(500).send('Internal servver Error');
    });
});


app.post('/iotsensors' , async(req,res) => {
    try { 
        const io = await Iot.create(req.body)
        res.status(200).json(io);

    }catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


app.get('/datafromsensors',async(req,res) => {
    try {
        const datafromiot = await Iot.find({});
        res.status(200).json(datafromiot);
    } catch (error) {
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