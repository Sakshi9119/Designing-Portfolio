const express = require("express");
const path = require("path");
// const { expr } = require("jquery");
require("./db/conn");
const User = require("./models/usermessage");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
const { expr } = require("jquery");
const app = express();
const port = process.env.PORT || 3000;

//setting path:
//setting static path:
const staticPath = path.join(__dirname, "../public");
//middleware
// app.use(express.static(staticPath));

const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//middleware to add bootstrap
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
//middleware to add js
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
//middleware to add jquery
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

// app.use(express.urlencoded({ extended: false })); //to get data in json format
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(staticPath));

app.set("view engine", "hbs"); //to know we are using hbs
//Folder change:views nd partials
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

//static routing
// app.get("/", (req, res) => {
//   res.send("Hii There!");
// });
//dynamic routing
app.get("/", (req, res) => {
  res.render("index");
});
// app.get("/contact", (req, res) => {
//   res.render("contact");
// });

//include schema nd all usermessage.js
app.post("/contact", async (req, res) => {
  try {
    // res.send(req.body);
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (error) {
    res.status(500).send(error);
  }
});

// create server
app.listen(port, () => {
  console.log(`Listening to port: ${port}...`);
});
