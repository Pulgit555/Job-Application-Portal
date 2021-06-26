const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

app.use("/user", UserRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});