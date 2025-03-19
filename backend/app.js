// docker run --name TinyStepsDB -p 27017:27017 -d mongo

const express = require('express')
const app = express();
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const fetchSchoolsData = require('./api/controllers/GetData');
const School = require('./models/SchoolModel');
require('dotenv').config();

// middleware
app.use(morgan('dev')) //logging
app.use(express.urlencoded( {extended: true}))
app.use(express.json()); 
app.use(cookieParser());
app.use(cors({origin:true, credentials:true}))

const checkIfSchoolsExistAndFetchData = async () => {
    try {
        // Check if there are any schools in the database
        const schoolCount = await School.countDocuments();
        console.log(`Found ${schoolCount} schools in the database.`);

        if (schoolCount === 0) {
            // If no schools are found, fetch and insert the data
            console.log("No schools found in the database. Fetching data...");
            const schools = await fetchSchoolsData();
            console.log(`${schools.length} schools fetched and saved to the database.`);
        } else {
            console.log("Schools data already exists. Skipping data fetch.");
        }
    } catch (err) {
        console.error("Error checking schools in the database:", err);
    }
};

// connect to database
const init = async () => {
    try {
        mongoose.set('bufferCommands', false)
        await mongoose.connect(`${process.env.DATABASE}`)
        console.log("Connected to database")

        // Check if schools data exists and fetch if necessary
        checkIfSchoolsExistAndFetchData();

        app.listen(process.env.PORT)
        console.log(`Service is ready to listen on port ${process.env.PORT}`)
    }
    catch(err){
        console.log("Error connecting to database")
    }
}

init()

// imported routes
const schoolRoutes = require('./api/routes/schoolRoute')
const authRoutes = require('./api/routes/authRoute')

// routes
app.use('/schools', schoolRoutes)

app.use('/auth', authRoutes)


// unknown requests
app.use((req, res) => res.send(null))