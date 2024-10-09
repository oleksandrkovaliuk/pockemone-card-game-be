require("dotenv").config();
const path = require("path");
const cors = require("cors");
const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const defaultCorsSettings = require("./barear/corsSettings");

const mainRouters = require("./routes/mainRoutes");
const fightAction = require("./api/sockets/fightActions");

const createNewUserFight = require("./lib/createNewUserFight");

const app = express();
const PORT = process.env.PORT || 3001;
const http_server = require("http").createServer(app);
const io = new Server(http_server, {
  cors: defaultCorsSettings,
});

const setupRoutes = () => {
  app.use(cors(defaultCorsSettings));

  app.use(function (req, res, next) {
    res.setHeader("X-Frame-Options", "DENY");
    next();
  });

  app.use("/api", mainRouters);
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
  });
};
const setupMiddlewares = () => {
  app.use(logger("dev"));
  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, "public")));

  app.use(express.urlencoded({ extended: false })); // default true

  app.use(express.json({ limit: "10mb" }));
};

const proccesingSockets = () => {
  io.on("connection", (socket) => {
    socket.on("request_create_new_fight", async (data) => {
      const new_fight = await createNewUserFight(
        data.fightInfo.userPokemon,
        data.fightInfo.generatedPokemon
      );
      return io.emit("approved", new_fight._id);
    });

    socket.on("attacked", async (data) => {
      const { attacker, attacked, fightId } = data;
      await fightAction(attacker, attacked, fightId, socket, io);
    });
  });
};

async function init() {
  try {
    setupMiddlewares();
    setupRoutes();

    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });

    console.log(
      `\x1b[31mMongoDB connection established and pinged successfully.\x1b[0m`
    );

    proccesingSockets();

    http_server.listen(PORT, () => {
      console.log(
        `\x1b[42m${process.env.PROD}\x1b[0m \x1b[31m${"project stage"}\x1b[0m`
      );
      return console.log(
        `\x1b[42mServer is listening on\x1b[0m  \x1b[31mhttp://localhost:${PORT}\x1b[0m`
      );
    });
  } catch (error) {
    await mongoose.disconnect();
    throw new Error(`Could not init application: ${error}`);
  }
}

init();

module.exports = app;
