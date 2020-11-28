const apiRoute = require("./apiroute");
const htmlRoute = require("./htmlroute");
const router = require("express").Router();


router.use("/api", apiRoute);
router.use(htmlRoute);

module.exports = router;
