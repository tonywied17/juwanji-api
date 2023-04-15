
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors({
  origin: ['https://juwanji.tbz.wtf', 'http://localhost:4200'],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set('json spaces', 2)

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// when i deploy it remember:
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/juwanji", (req, res) => {
  res.json({ message: "Juwanji API." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}