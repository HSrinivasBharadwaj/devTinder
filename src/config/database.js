const mongoose = require('mongoose');

const connectDB = async() => {
    mongoose.connect(
        "mongodb+srv://srinivasbharadwaj8:Hullur1234@cluster0.phr3z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      );
}

module.exports = connectDB