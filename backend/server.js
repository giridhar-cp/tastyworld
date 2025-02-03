/*import express  from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import foodRouter from "./routes/foodRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000;


// middlewares
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(cors())

// db connection
connectDB()

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart", cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("API Working")
  });

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))
*/

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import foodRouter from './routes/foodRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import multer from 'multer';  // Import multer for file upload

// app config
const app = express();
const port = process.env.PORT || 4000;

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Store images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Save files with a unique name
  }
});

const upload = multer({ storage });

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));  // Serve images from 'uploads' folder
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.post('/api/food/add', upload.single('image'), (req, res) => {
  // Handle food add operation (to be placed in foodController.js)
  const { name, description, price, category } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null;

  // Make sure all fields are valid
  if (!name || !description || !price || !category || !image) {
    return res.json({ success: false, message: 'All fields are required' });
  }

  const food = new foodModel({ name, description, price, category, image });

  food.save()
    .then(() => res.json({ success: true, message: 'Food added successfully!' }))
    .catch((error) => res.json({ success: false, message: 'Error adding food' }));
});

// Start server
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
