// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require('mongoose');

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const doctorSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   name: String,
//   experience: Number,
//   location: String,
//   clinicName: String,
//   price: Number,
//   patientStories: Number,
//   image: String,
// });

// const Doctor = mongoose.model('Doctor', doctorSchema);

// app.get("/doctors", async (req, res) => {
//   try {
//     const titleToFind = req.query.title;

//     if (!titleToFind) {
//       return res.json({
//         status: "FAILED",
//         message: "Title parameter is missing",
//       });
//     }

//     // Fetch doctors from MongoDB
//     const filteredDoctors = await Doctor.find({ title: titleToFind });

//     res.json({
//       status: "SUCCESS",
//       data: filteredDoctors,
//     });
//   } catch (error) {
//     res.json({
//       status: "FAILED",
//       message: "Something went wrong",
//     });
//   }
// });


// app.listen(process.env.PORT, () => {
//   mongoose.connect(process.env.MONGODB_URL)
//     .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
//     .catch(error => console.log(error))
// })











const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const fs = require("fs");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const doctors = [
  {
    id: "1",
    title: "Dentist",
    name: "DR.Ujjval",
    experience: "10",
    location: "Dehradun",
    clinicName: "Face Mile Dentofacial clinic",
    price: "200",
    patientStories: "17",
    image: "doc1Dentist.jpg",
  },
  {
    id: "2",
    title: "Dentist",
    name: "DR.Raj",
    experience: "12",
    location: "Bangalore",
    clinicName: " clinic",
    price: "400",
    patientStories: "26",
    image: "doc2Dentist.jpg",
  },
  {
    id: "3",
    title: "Gynecologist and Obstetrician",
    name: "DR.Sham",
    experience: "8",
    location: "Lucknow",
    clinicName: "sham clinic",
    price: "100",
    patientStories: "15",
    image: "doc3gyneco.jpg",
  },
  {
    id: "4",
    title: "Gynecologist and Obstetrician",
    name: "DR.Bheem",
    experience: "13",
    location: "Maday pradesh",
    clinicName: "Bheem clinic",
    price: "600",
    patientStories: "19",
    image: "doc4gyneco.jpg",
  },
  {
    id: "5",
    title: "Deititan and Nutrition",
    name: "DR.Mehek",
    experience: "16",
    location: "Lucknow",
    clinicName: "Mehe kclinic",
    price: "500",
    patientStories: "27",
    image: "doc5Nutrition.jpg",
  },
];

const doctorSchema = mongoose.model('doctors', {
  id: Number,
  title: String,
  name: String,
  experience: Number,
  location: String,
  clinicName: String,
  price: Number,
  patientStories: Number,
  image: String,
})


const assetsPath = path.join(__dirname, "Backend/assests");

app.get("/doctors", (req, res) => {
  try {
    const titleToFind = req.query.title;
    if (!titleToFind) {
      return res.json({
        status: "FAILED",
        message: "Title parameter is missing",
      });
    }

    const filteredDoctors = doctors.filter(
      (doctor) => doctor.title.toLowerCase() === titleToFind.toLowerCase()
    );

    res.json({
      status: "SUCCESS",
      data: filteredDoctors,
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: "Something went wrong",
    });
  }
});

app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(assetsPath, filename);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data);
  });
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log(`Server running on http://localhost:${process.env.PORT}`))
  .catch(error => console.log(error))
});
