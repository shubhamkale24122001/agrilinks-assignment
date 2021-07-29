const http = require('http');
const express= require('express');
const mongoose= require('mongoose');

const hostname="localhost";
const port= 3000;

const reportsRouter= require('./routes/reportsRouter');

const connect= mongoose.connect('mongodb://localhost:27017/reportsdb');
connect.then((db)=>{
    console.log('Connected correctly to server');
}, (err)=>{console.log(err);});

const app= express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/reports', reportsRouter);


const server= http.createServer(app);
server.listen(port, hostname,()=>{
    console.log(`Server is running on http://${hostname}:${port}`);
});