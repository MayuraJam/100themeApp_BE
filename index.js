const express = require("express");
const {
  getAllTheme,
  insertNewTheme,
  getAllThemeForDropdown,
  updateTheme,
  getThemeById
} = require("./controller/theme.controller");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerDocument = require('./swagger.json');

require("dotenv").config();

app.use(cors());
app.use(express.json());
const port = 3050;

//install swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "for test api",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
var options = {
  explorer: true,
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//test api
app.get("/index", (req, res) => {
  res.send("Hello my new express");
});

//get all theme

app.get("/api/theme", async (req, res) => {
  try {
    const getTheme = await getAllTheme();
    // console.log("response:",getTheme);
    res.json(getTheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผืดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
});

app.get(`/api/theme/:id`, async (req, res) => {
  const reqParam = req.params.id;
  try {
    const getTheme = await getThemeById(reqParam);
    res.json(getTheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผืดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
});

app.get("/api/theme/ForDropdown", async (req, res) => {
  try {
    const getTheme = await getAllThemeForDropdown();
    res.json(getTheme);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผืดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
});

app.post("/api/theme", async (req, res) => {
  try {
    const reqBody = req.body;
    const { themeName, color100, color75, color25, color20, colorTone } =
      reqBody;
      console.log("insert data",reqBody);
    const resData = await insertNewTheme(
      themeName,
      color100,
      color75,
      color25,
      color20,
      colorTone,
    );

    res.status(200).json({
      message: "เพิ่มข้อมูลสำเร็จ",
      success: true,
      data: resData 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผืดผลาดในการจัดการข้อมูล",
      success: false,
      error: error.message,
    });
  }
});

app.put("/api/theme", async (req, res) => {
  try {
    const reqBody = req.body;
    const { themeName, color100, color75, color25, color20, colorTone ,id} =
      reqBody;
      console.log("insert data",reqBody);
    const resData = await updateTheme(
      id,
      themeName,
      color100,
      color75,
      color25,
      color20,
      colorTone,
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลสำเร็จ",
      success: true,
      data: resData 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผืดผลาดในการจัดการข้อมูล",
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log("server is running on port : ", port);
});
