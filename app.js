const express = require('express');
const path = require('path');

const app = express();

const projectsRoutes = require('./routes/projects');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')
const getUserRoute = require('./middleware/getUser')

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(getUserRoute) //get user from jwt

app.use(authRoutes)

//Só deixa passar se tiver autenticado

app.use(projectsRoutes)

app.use(usersRoutes)



module.exports = app;
