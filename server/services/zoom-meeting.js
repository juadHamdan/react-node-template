const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios')
const jwt = require("jsonwebtoken");
const moment = require('moment')

function generateToken() {
    const payload = {
        iss: process.env.API_KEY,
        exp: ((new Date()).getTime() + 5000)
    };
    const token = jwt.sign(payload, process.env.API_SECRET);
    return token;
}

async function createZoomMeeting(startTime, duration, subject, mentorEmail) {
    try {
        var UTCDateTime = moment(startTime).format("MM/DD/YYYY hh:mm:ss A UTC");
        var meetingTime = new Date(UTCDateTime);
        console.log(duration);
        const token = generateToken();
        const email = process.env.GMAIL; //host email id;
        const result = await axios.post("https://api.zoom.us/v2/users/" + email + "/meetings", {
            "topic": subject,
            "type": 2,
            "start_time": meetingTime,
            "duration": duration,
            "timezone": "Israel",
            "password": "1234567",
            "schedule_for": mentorEmail,
            "settings": {
                "host_video": true,
                "participant_video": true,
                "cn_meeting": false,
                "in_meeting": true,
                "join_before_host": true,
                "mute_upon_entry": false,
                "watermark": false,
                "use_pmi": false,
                "approval_type": 2,
                "audio": "both",
                "auto_recording": false,
                "enforce_login": false,
                "registrants_email_notification": false,
                "waiting_room": false,
                "allow_multiple_devices": true,

            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'User-Agent': 'Zoom-api-Jwt-Request',
                'content-type': 'application/json'
            }
        });
        return result.data.join_url
    } catch (error) {
        console.log(error)
        console.log(error.message);
    }
}


module.exports = { createZoomMeeting }