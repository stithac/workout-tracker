const path = require('path');
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});