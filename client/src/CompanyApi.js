import axios from "axios";

async function fetchCompanies() {
  try {
    const response = await axios.get("/companies");
    console.log(response.data)
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}


async function addPendingUserToCompany(companyID, userID) {
    try {
      const response = await axios.patch(`/companies/pendings/${companyID}/${userID}`);
      console.log(response)
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

  // async function fetchCompanySkills(){
  //   try {
  //     const response = await axios.get(`/companies/users/${companyID}`);
  //     return response.data;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // }

  async function fetchCompanyMentors(companyID){
      try {
      const response = await axios.get(`/companies/mentors/${companyID}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
  }
  }


  

export {
    fetchCompanies, addPendingUserToCompany, fetchCompanyUsers, fetchCompanyPendingUsers, fetchCompanyMentors
};
