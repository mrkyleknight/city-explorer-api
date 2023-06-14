'use strict';

console.log('Yay! Our first server!');


const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;


app.listen(PORT, ()=> console.log(`We are running ${PORT}!`));




app.get('/', (request, response)=>{
  response.status(200).send('Welcome');

});



app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstname;
  let userLastName = request.query.lastname;

  response.status(200).send(`hello ${request.query.firstname} ${userLastName}`);
});

app.get('*',(request, response) => {
  response.status(404).send('Sorry, page not found');

});

app.use((error, request, response, next)=>{
  console.log(error.message);
  response.status(500).send(error.message);

});