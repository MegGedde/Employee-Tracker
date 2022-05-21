const inquirer = require('inquirer');
const express = require('express');
const db = require('./db/connection');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });