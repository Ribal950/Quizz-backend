require('dotenv').config();
const express = require ('express');
const mysql = require ('mysql2');
const bodyParser = require ('body-parser');

const app = express ();
app.use(bodyParser.json());

// conecter a ma base de donnèe
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err){ 
        console.log('ERREUR !!!');
        }else {
        console.log('BRAVO !');
        }
    })

    const userRoutes = require('./routes/users');

    app.use('/api/users', userRoutes);

    const port = process.env.PORT || 3306;
    app.listen(port, () => {
      console.log('SERVEUR DEMARRE');
    })

    //commande node server.js



    