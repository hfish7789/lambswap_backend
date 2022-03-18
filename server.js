const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(cors());
// parse requests of content-type - application/json
// app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.array()); 

app.use(express.static(__dirname + "/app/build/"));

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: './app/build' }, function (err) {
      if (err) {
          res.status(500).send(err);
      }
  });
});

require("./app/routes/routes.js")(app);
// set port, listen for requests
const PORT =  80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});