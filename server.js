const express = require('express');
const dbfile = require('./conn')

// express app
const app = express();

// listen for request
app.listen(5000, () =>{
    console.log("Server Started Successfully")
});

app.get('/', (req, res) => {
    res.sendFile('./views/signin.html', { root: __dirname});
}); 
