import axios from 'axios'

async function addMeeting(userID, meeting) {
  try {
    const response = await axios.post(`/meetings/${userID}/`, meeting);
    return response.data
  } catch (error) {
    console.error(error);
    return null
  }
}

async function deleteMeeting(meetingID) {
  try {
    const response = await axios.delete(`/meetings/${meetingID}/`);
    return response.data
  } catch (error) {
    console.error(error);
    return null
  }
}

async function updateMeeting(meetingID, userID, updatedData) { // updatedData is object of {title , startDate, endDate}
  try {
    const response = await axios.patch(`/meetings/${meetingID}/${userID}`, updatedData);
    return response.data
  } catch (error) {
    console.error(error);
    return null
  }
}

async function fetchMeetings(userID) {
  try {
    const response = await axios.get(`/meetings/${userID}/`);
    const meetings = response.data.map(meeting => { return { ...meeting, id: meeting._id } })
    return meetings
  } catch (error) {
    console.error(error);
    return null
  }
}

async function bookMeeting(meetingID, menteeID) {
  try {
    const response = await axios.patch(`/book-meeting/${meetingID}/${menteeID}`, {
      action: "book"
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function cancelMeeting(meetingID, menteeID) {
  try {
    const response = await axios.patch(`/book-meeting/${meetingID}/${menteeID}`, {
      action: "cancel"
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addReview(meetingID, review) {
  try {
    const response = await axios.post(`/reviews/${meetingID}`, review)
    return response.data
  } catch (error) {
    console.error(error);
    return null
  }
}

async function getReviews(mentorID) {
  try {
    const response = await axios.get(`/reviews/${mentorID}`)
    console.log(response);
    let reviews = response.data;
    return reviews;
  } catch (error) {
    console.error("rrorrr");
    return null
  }
}

export { addMeeting, deleteMeeting, updateMeeting, fetchMeetings, bookMeeting, cancelMeeting, addReview, getReviews }