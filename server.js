const express = require('express');
const session = requie('express-session');
const exphbs = require('express-handlebars');

const app = express();
const PORT = express.env.PORT || 3001;

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => console.log('Now Listening'));