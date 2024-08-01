const express= require('express');
const {Pool} = require('pg');
const {startInquirer} = require('./index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password:'paradox',
        host:'localhost',
        database:'employees_db'
    },
    console.log('connected to the employees_db database!')
)

pool.connect();

pool.query(startInquirer());

// pool.end();

app.listen(PORT, ()=>{
    console.log('Server is running...')
})