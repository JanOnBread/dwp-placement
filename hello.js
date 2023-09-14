//
const express = require('express')  //  same as import  express from express ()

// just expressing express (a function) to a contant 
const app = express()

// numbering our port 
const port = 3001

const getHandler = (req, res) => res.send('Hello')

// this is the same as the bottem 
// function getHandler (req, res) {
//   return res.send('hello world')
// }

app.get('/hello', getHandler)


// call back function that sends a log if the code has been excutted. 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})