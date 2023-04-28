const Company = require("../models/Company");
const User = require("../models/User")

const getIdObject = (id) => {
    return new mongoose.Types.ObjectId(id);
};

function getCompanies() {
    return Company.find({});
}

async function addCompany(companyData) {
    const company = new Company(companyData)
    return company.save();
}

function getPendingUsers(companyID) {
    companyID = getIdObject(companyID)
    return User.find({ $and: [{ companyID: companyID }, { isPending: true }] })
}

// mentors and users 
function getCompanyUsers(companyID) {
    companyID = getIdObject(companyID)
    return User.find({ companyID: companyID })
}

module.exports = { getCompanies, addCompany, getPendingUsers, getCompanyUsers }