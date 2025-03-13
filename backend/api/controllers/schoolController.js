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

module.exports = {
    get_schools,
}