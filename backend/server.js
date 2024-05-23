require('dotenv').config()
const connectDB = require('./config/db');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')
const productRoutes = require('./routes/product')
const CategoryRoutes = require('./routes/categoryRoutes')

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Save files to the 'uploads/' directory

const app = express()


//middleware
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Use 'upload' middleware in your route for file upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  // File has been uploaded, you can now handle the file in the request
});

//routes
app.use('/api/workouts' , workoutRoutes)
app.use('/api/products' , productRoutes)
app.use('/api/categories' , CategoryRoutes)
app.use('/api/auth', require('./routes/auth'));
//connect db

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
