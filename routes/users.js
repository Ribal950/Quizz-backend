const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

require('dotenv').config();
//coucou

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
})

router.post('/register', async (req, res) => {
  const { username, lastname, name, password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username,lastname, name, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send({message: 'Utilisateur créé'});
  })
})

router.get('/', (req,res) => {
  const sql = 'SELECT * FROM users/register';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});




app.use(bodyParser.json());

module.exports = router;

//connecter à ma base de donnée