const express = require('express');
const path = require('path');

const app = express();

const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes)
app.use(projectsRoutes)
app.use(usersRoutes)

module.exports = app;
