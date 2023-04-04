import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import deviceRoutes from "./routes/device.js";
import locationRoutes from "./routes/location.js";
import { createDevice } from "./controllers/device.js";



/* configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" })); 
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File storage */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

/* Routes */

/* Routes with files */
// POST /api/:LocationID/device
app.post("/api/device/:locationId", upload.single("imageURL"), createDevice);

/* Routes without files */
app.use("/api/location", locationRoutes);

app.use("/api/device", deviceRoutes);








/* Mongoose setup */
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 6001;
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));
