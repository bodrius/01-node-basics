const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const contacts = require("../contacts");

const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static("public"));
server.use(morgan("dev"));

server.get("/api", (req, res) => {
  res.send({ method: "GET" });
});

server.get("/", function (req, res) {
  res.send("Hello World");
});
server.get("/api/contacts", (req, res) => {
  contacts.listContacts(req, res);
});
server.get("/api/contacts/:contactId", (req, res) => {
  contacts.getContactById({ req, res, contactId: req.params.contactId });
});


