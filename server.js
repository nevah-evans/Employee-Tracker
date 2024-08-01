const express= require('express');
const {startInquirer} = require('./index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


startInquirer();


// app.listen(PORT, ()=>{
//     console.log('Server is running...')
// })

