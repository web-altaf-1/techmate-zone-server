const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000 ;

app.get('/',(req,res)=>{
    res.send('Manufacturer website is running')
})

app.listen(port,()=>{
    console.log('listening to the port',port);
})