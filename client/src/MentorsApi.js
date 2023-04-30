import axios from "axios";
import { FEATURED_MENTORS_NUMBER } from "./Constants";

async function fetchMentorById(id) {
  try {
    const response = await axios.get("/mentors/" + id);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchMentorByUserId(userId) {
  try {
    const response = await axios.get("/mentors/users/" + userId);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function postMentorById(id, mentor) {
  try {
    const response = await axios.post("/mentors/" + id, mentor);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchMentorsBySkill(skill, companyId) {
  try {
    const response = await axios.get(`/companies/mentors/${companyId}?skill=${skill}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchFeaturedMentors(companyId) {
  try {
    const response = await axios.get(
      `/companies/mentors/${companyId}?limit=${FEATURED_MENTORS_NUMBER}`
    );
    console.log("featured mentors:", response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchMentorsNames(companyId) {
  try {
    const response = await axios.get("/mentors/names/" + companyId);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function deleteUserById(id) {
  try {
    const response = await axios.delete("/mentors/" + id);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateMentor(userID, updatedMentor) {
  try {
    const response = await axios.put("/mentors/" + userID, updatedMentor);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteMentor(userID) {
  try {
    const response = await axios.delete("/mentors/pages" + userID);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}


async function approveUser(userID) {
  try {
    const response = await axios.patch(`/mentors/${userID}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export {
  fetchMentorById,
  postMentorById,
  fetchMentorsBySkill,
  fetchFeaturedMentors,
  fetchMentorsNames,
  fetchMentorByUserId,
  updateMentor,
  deleteUserById,
  deleteMentor,
  approveUser
};
