const { confirmReservation } = require("../../controller/reservationForm");
const express = require("express");
const router = express.Router();

router.post("/reservation", confirmReservation);

module.exports = router;
