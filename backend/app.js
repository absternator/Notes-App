const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// create mongodb database - on cloud Amazon server(MongodB atlas)
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// check connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Succesfully connected to Data base ");
});
/***********************Top is just boiler plate.. below is routes ************************************************************/
app.get("/",(req,res) =>{
    res.send("<h1>Hello World<h1>")
})
// notes route 
const notesRouter  = require("./routes/notes");
app.use("/notes",notesRouter);
// listen on port 5000
let port = process.env.PORT;
if(port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log(`Server is now running on port: ${port}`);
});