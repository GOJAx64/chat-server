const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('Database Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error in the data base - look out logs');
    }
}

module.exports = {
    dbConnection
}