const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app =express()

const port =4007
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/project',
 ).then(()=>console.log('connected mongodb')).catch((err)=>console.log(err.message))

const router = require('./router');
app.use('/api',router)



app.listen(port, ()=> {
	console.log(`server app running :${port}` )
});