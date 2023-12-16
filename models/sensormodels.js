const mongoose = require('mongoose');

const iotDataSchema = new mongoose.Schema({
    sensorId: {
        type: String,
        required: true
    }, //here i am storing the continous data in an array
    data: [
        {
            distance: {
                type: Number,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const IotDataModel = mongoose.model('IotData', iotDataSchema);

module.exports = IotDataModel;
