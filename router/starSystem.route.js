const express = require("express");
const router = express.Router();
const {
  getAllStarSystem,
  getStarSystemById,
} = require("../controller/starSystem.controller");

router.get("/", getAllStarSystem);
router.get("/:id", getStarSystemById);

module.exports = router;
