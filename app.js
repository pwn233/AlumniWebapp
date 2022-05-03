const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./config/database');

//Test DB connection
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Database Error : ' + err));

const app = express();

// Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

// Body Parser 
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'handlebars');

// Set static folder 
app.use(express.static(path.join(__dirname, 'public')));

// Index Route
app.get('/', (req, res) => { res.render('index', { layout: 'landing' }) })

// ALumni routes

app.use('/alumnis', require('./routes/alumnis'));

const PORT = process.env.PORT || 2330;

app.listen(PORT, console.log(`Server started on port ${PORT}`));