// Dependencies
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");

// Deployed app will access PORT variable. When ran locally, app will run on localhost/3000
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose connection. Deployed app will connect to MONGODB_URI. When ran locally, app will connect to workout mongodb database
// When successfully connected, a message will be displayed on the console log. Otherwise, an error will display
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log("Connected to Mongo database!");
})
.catch(err => {
  console.error("App starting error:", err.stack);
});

// routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});