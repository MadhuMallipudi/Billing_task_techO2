const express = require("express");
const router =  express.Router();
const itemRouter =  require("./item.router");
const billRouter =  require("./bills.router");

router.use("/items",itemRouter);
router.use("/bills",billRouter);


module.exports = router;