const formatTime = (hours, minutes) => {
    let formatedHoure = hours > 9 ? hours : "0" + hours;
    let formatedMinutes = minutes > 9 ? minutes : "0" + minutes;
    return formatedHoure + ":" + formatedMinutes;
}

module.exports = { formatTime }