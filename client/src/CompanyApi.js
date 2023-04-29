import axios from "axios";

async function fetchCompanies() {
  try {
    const response = await axios.get("/companies");
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}


async function addPendingUserToCompany(companyID, userID) {
    try {
      const response = await axios.patch(`/companies/pendings/${companyID}/${userID}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function fetchCompanyUsers(companyID) {
    try {
      const response = await axios.get(`/companies/users/${companyID}?isPending=false`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function fetchCompanyPendingUsers(companyID) {
    try {
      const response = await axios.get(`/companies/users/${companyID}?isPending=true`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

export {
    fetchCompanies, addPendingUserToCompany, fetchCompanyUsers, fetchCompanyPendingUsers
};
