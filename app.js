const express = require('express');
const path = require('path');

const app = express();

const backOfficeRoutes = require('./routes/backoffice');
const authRoutes = require('./routes/auth')

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes)
app.use(backOfficeRoutes)

app.listen(3000);