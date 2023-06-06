import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import MongoStore from "connect-mongo";
import expressSession from "express-session";
import flash from "connect-flash"

import dashboardRouter from "./src/controllers/dashboard.controller.js";
import loginAdminController from "./src/controllers/loginAdmin.controller.js";
import logoutAdminController from "./src/controllers/logoutAdmin.controller.js";
import storeAdminController from "./src/controllers/storeAdmin.controller.js";
import registerAdminController from "./src/controllers/registerAdmin.controller.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

global.loggedIn = null;

const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGODB_URL,
  collection: "sessions",
  ttl: 3600,
  autoRemove: "native",
  autoRemoveInterval: 10,
});

app.use(
  expressSession({
    secret: "TOKEN_SECRET",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(flash());


// app.use(express.static(path.join(__dirname, "/public/")));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/api/v1", routes);

app.get("/", dashboardRouter)
app.get("/login",  loginAdminController);
app.get("/register",  storeAdminController);
app.post("/register", registerAdminController);
app.get("/logout", logoutAdminController);
app.post("/user/register",  storeAdminController);
app.post("/user/login",  loginAdminController);



const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connection is successful");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
