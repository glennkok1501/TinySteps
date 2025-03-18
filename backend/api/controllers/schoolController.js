const School = require('../../models/SchoolModel')

const get_schools = async (req, res) => {
    try{
        const schools = await School.find().sort('_id')
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

module.exports = {
    get_schools,
    get_options,
    get_filter
}