const { verifyJWT } = require('../../config/AuthMiddleware')
const School = require('../../models/SchoolModel')
const User = require('../../models/UserModel')


const get_schools = async (req, res) => {
    try{
        var schools = await School.find().sort('_id')
        // console.log(verifyJWT(req.cookies.jwt))
        const userId = verifyJWT(req.cookies.jwt).id
        const user_bookmarks = await User.findOne({_id: userId}).select('bookmarks')
        schools = schools.map(school => ({
            ...school.toObject(), // Convert Mongoose document to plain object
            bookmarked: user_bookmarks.bookmarks.includes(school._id.toString()) // Check if school is bookmarked
        }));
        res.send(schools)
    }
    catch (err) {
        console.log(err);
    }
}

const get_options = async (req, res) => {
    try {
        const option = req.query.q
        const options = await School.distinct(option);
        res.send(options)
    }
    catch (err) {
        console.log(err)
    }
}

const get_filter = async (req, res) => {
    // console.log(true)
    try {
        const {food_offered, second_languages_offered, spark_certified, provision_of_transport} = req.query
        // Construct dynamic filter object, excluding empty values
        const filters = {};
        if (food_offered) filters.food_offered = food_offered;
        if (second_languages_offered) filters.second_languages_offered = second_languages_offered;
        if (spark_certified) filters.spark_certified = spark_certified;
        if (provision_of_transport) filters.provision_of_transport = provision_of_transport;

        const filteredSchools = await School.find(filters);

        res.send(filteredSchools);
    }

    catch (err) {
        console.log(err)
    }
}

const get_search = async (req, res) => {
    try{
        const q = req.query.q;

        if (!q) return res.status(400).json({ message: "Query parameter is required" });

        const words = q.split(" ");

        const searchConditions = words.map(word => ({
            $or: [
                { centre_name: { $regex: word, $options: "i" } }, // Match in name
                { centre_address: { $regex: word, $options: "i" } } // Match in address
            ]
        }));


        const searchedSchools = await School.find({ $and: searchConditions });
        res.send(searchedSchools)
    }
    catch (err) {
        console.log(err)
    }
    
}

const post_bookmark = async (req, res) => {
    const userId = verifyJWT(req.cookies.jwt).id
    const {schoolId} = req.body
    try {
        // Find user by ID
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        // Check if schoolId is already in bookmarks array
        const index = user.bookmarks.indexOf(schoolId);
        
        if (index === -1) {
            // If schoolId is not in the bookmarks array, add it
            user.bookmarks.push(schoolId);
        } else {
            // If schoolId is already in the bookmarks array, remove it
            user.bookmarks.splice(index, 1);
        }

        // Save updated user document
        await user.save();
        res.send(true)
    } catch (err) {
        console.log(err)
        res.send(false)
    }

}

const get_school = async (req, res) => {
    try {
        const id = req.params.id
        const data = await School.findById(id)

        res.send(data)
    }

    catch (err) {
        console.log(err)
    }
}

module.exports = {
    get_schools,
    get_options,
    get_filter,
    post_bookmark,
    get_search,
    get_school
}