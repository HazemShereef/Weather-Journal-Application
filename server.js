// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

const port = 5555;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const server = app.listen(port,listenining);
function listenining(){
    console.log("the server is running");
    console.log(`running on local host :${port}`);
};

//GET route to send the data stored in projectData object
app.get("/data",sendData)

function sendData(req,res){
    res.send(projectData);
}

//POST route to recieve the data sent from the app.js file

app.post("/dataSave", newData);
function newData(req,res){
   // here i set each property to its value comming from the app.js file
    projectData["date"]=req.body.date;
    projectData["temp"]=req.body.temp;
    projectData["content"]=req.body.content;
    return projectData;
   
}