import { useState } from 'react'
import Modal from '../modal/Modal'
import MentorSchedule from './MentorSchedule'

const MentorScheduleModal = () => {
    const [showMentorSchedule, setShowMentorSchedule] = useState(false)
    const [meetings, setMeetings] = useState([
        {
            title: "React Lesson",
            startDate: new Date(2023, 3, 21, 9, 35),
            endDate: new Date(2023, 3, 21, 11, 30),
            id: "abcs",
            isBooked: true
        },
        {
            title: "CSS Lesson", 
            startDate: new Date(2023, 3, 21, 9, 35),
            endDate: new Date(2023, 3, 21, 11, 30),
            id: "abcs1", 
            isBooked: false
        }])

    const onCloseMentorScheduleModal = () => setShowMentorSchedule(false)
    const onOpenMentorScheduleModal = () => setShowMentorSchedule(true)

    return (
        <div>
            <button onClick={onOpenMentorScheduleModal}>Open Mentor Schedule (Mentor Page)</button>
            <Modal show={showMentorSchedule} onClose={onCloseMentorScheduleModal}>
                <MentorSchedule meetings={meetings} />
            </Modal>
        </div>
    )
}

export default MentorScheduleModal