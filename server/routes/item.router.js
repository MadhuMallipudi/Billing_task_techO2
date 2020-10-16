const express = require("express");
const item_router = express.Router();
const ctrl =  require("../controllers/item.controller");

item_router.route("/listItems").get(ctrl.list);
item_router.route("/addItems").post(ctrl.create);

module.exports = item_router;
