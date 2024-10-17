const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const fetch = require('node-fetch');
const knex = require('knex')


const signin = require('./controllers/signin/signin')
const register = require('./controllers/register/register')
const image = require('./controllers/image/image')
const profile = require('./controllers/profile/profile')
const api = require('./controllers/api/api')


const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'nika',
      database: 'facedec',
    },
  });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/clarifai', (req,res) => {api.handleapi(req,res)})
app.post('/signin', (req,res) => {signin.handlesignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleregister(req,res,db,bcrypt)});
app.get('/profile/:id', (req,res) => {profile.handleprofile(req,res,db)})
app.put('/image', (req,res) => {image.handleimage(req,res,db)});

app.listen(3001, () => {
    console.log('app is running on port 3000')
});
