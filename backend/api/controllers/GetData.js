const axios = require('axios');
const School = require('../../models/SchoolModel')

const calStockImgIndex = (nums) => {
    var total = 0
    for (var i = 0; i < nums.length; i++) {
        total += parseInt(nums[i])
    }
    return total % 11
}

const fetchSchoolsData = async (startOffset = "/api/action/datastore_search?resource_id=d_696c994c50745b079b3684f0e90ffc53") => {
    const ENDPOINT = "https://data.gov.sg";
    let nextOffset = startOffset;
    let allSchools = [];
    try {
        while (nextOffset) {
            const result = await axios.get(ENDPOINT + nextOffset);
            if (result.status === 200) {
                const data = result.data.result.records;
                if (data.length === 0) {
                    break;
                }
                allSchools = [...allSchools, ...data];
                // Save each school to the database
                data.forEach(async (schoolData) => {
                    if (schoolData.centre_name != "na") {
                        const newSchool = new School({...schoolData, thumbnail: calStockImgIndex(schoolData.postal_code)});  // Use SchoolModel to create new documents
                        await newSchool.save()
                    }
                    
                });

                nextOffset = result.data.result._links ? result.data.result._links.next : null;
            }
        }

        return allSchools;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
    }
};

module.exports = fetchSchoolsData;