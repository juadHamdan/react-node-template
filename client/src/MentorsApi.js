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
    const response = await axios.get("/mentor/" + userId);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function postMentorById(id, mentor) {
  try {
    const response = await axios.post("/mentor/" + id, mentor);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function fetchMentorsBySkill(skill) {
  try {
    const response = await axios.get("/mentors?skill=" + skill);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchFeaturedMentors() {
  try {
    const response = await axios.get(
      "/mentors?limit=" + FEATURED_MENTORS_NUMBER
    );
    console.log("featured mentors:", response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchMentorsNames() {
  try {
    const response = await axios.get("/mentorsNames");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function deleteUserById(id) {
  try {
    const response = await axios.delete("/mentor/" + id);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateMentor(userID, updatedMentor) {
  try {
    const response = await axios.put("/mentor/" + userID, updatedMentor);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function deleteMentor(userID) {
  try {
    const response = await axios.delete("/mentor-Page/" + userID);
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function fetchColleagues() {
  try {
    const response = await axios.get("/users");
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
  fetchColleagues,
};
