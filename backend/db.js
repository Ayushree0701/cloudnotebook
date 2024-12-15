const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/cloudnotebook";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected to Mongo successfully')
    })
}

module.exports = connectToMongo;