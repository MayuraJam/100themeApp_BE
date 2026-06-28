const starSystemService = require("../service/starSystem.service.js");

async function getAllStarSystem(req, res) {
  try {
    const getStarSystem = await starSystemService.getAllStarSystem();
    res.json({
      success: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: getStarSystem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

async function getStarSystemById(req, res) {
  const reqParam = req.params.id;
  try {
    const getStarSystem = await starSystemService.getStarSystemById(reqParam);
    res.json({
      success: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: getStarSystem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getAllStarSystem,
  getStarSystemById,
};