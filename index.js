const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const router = require('./Routes/routes');
const connectDB = require("./Database/db");
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World")
})


app.use(express.json());

app.use(cors({ origin: "*" }));

app.use("/", router);



app.listen(port, () => {
    console.log(`Server Started in the port:${port}`)
})
