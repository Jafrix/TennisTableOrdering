const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const serverConfig = (app) => {
  app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    optionsSuccessStatus: 200,
    credentials: true,
  }));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
};

module.exports = serverConfig;
