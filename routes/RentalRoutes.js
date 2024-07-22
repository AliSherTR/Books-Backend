const express = require("express");
const rentalController = require("../controllers/RentalController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/rent").post(protect, rentalController.rentBook);

module.exports = router;
