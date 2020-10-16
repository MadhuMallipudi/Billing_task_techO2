const express = require("express");
const bills_router = express.Router();
const ctrl =  require("../controllers/bills.controller");

bills_router.route("/listBills").get(ctrl.list);
bills_router.route("/addBill").post(ctrl.create);
bills_router.route("/counts").get(ctrl.getCounts);
module.exports = bills_router;