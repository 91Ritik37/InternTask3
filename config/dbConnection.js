const mongoose = require('mongoose');

const uri = "mongodb+srv://onworkonline9892:NdRvMgkZlyc6xJkh@cluster0.xguybf1.mongodb.net/?retryWrites=true&w=majority";

const dbConnection = async () => {
    try {
        const connect = await mongoose.connect(uri);

        console.log("DB connected ", connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnection;