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


export {
    fetchCompanies, addPendingUserToCompany
};
