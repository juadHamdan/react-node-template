import axios from 'axios'

async function addMeeting(userID, meeting) {
    try {
        const response = await axios.post(`/meetings/${userID}/`, meeting);
        console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
        return null
    }
}

async function deleteMeeting(meetingID) {
    try {
        const response = await axios.delete(`/meetings/${meetingID}/`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        return null
    }
}

async function updateMeeting(meetingID, updatedData) { // updatedData is object of {title , startDate, endDate}
    try {
        const response = await axios.patch(`/meetings/${meetingID}/`, updatedData);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        return null
    }
}

async function getMeetings(userID) {
    try {
        const response = await axios.get(`/meetings/${userID}/`);
        return (response.data)
    } catch (error) {
        console.error(error);
        return null
    }
}

async function bookMeeting (meetingID, menteeID) {
    try {
        const response = await axios.patch(`/book-meeting/${meetingID}/${menteeID}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
        return null
    }
}

export { addMeeting, deleteMeeting, updateMeeting, getMeetings,bookMeeting }