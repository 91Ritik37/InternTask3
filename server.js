const express = require('express');
const dbConnection = require('./config/dbConnection');
const helmet = require("helmet");
const morgan = require("morgan");
const PORT = process.env.PORT | 5000;
const app = express();

const postRoutes = require("./routes/postRoutes");
dbConnection();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/post", postRoutes);





app.listen(PORT, (req, res) => {
    console.log(`server running ${PORT}`)
})
