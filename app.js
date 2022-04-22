// Externerl Imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// Internal Imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewears/common/errorHandler");
const inboxRouter = require("./router/inboxRouter");
const usersRouter = require("./router/usersRouter");
const loginRouter = require("./router/loginRouter");

const app = express();
dotenv.config();

//database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successfull"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

//set static path
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

//404 not found handler
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);

//connect to server
app.listen(process.env.PORT, () => {
  console.log(`app listening to port ${process.env.PORT}`);
});
