const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const { MongoClient, ServerApiVersion } = require('mongodb');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const uri = process.env.URI

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({
    helpers
});

const sess = {
    secret: 'Super secret secret',
    cookie: { maxAge: 25 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);


app.use(session(sess))
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(routes);

sequelize.sync({
    force: false
}).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});