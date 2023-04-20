import { useState } from 'react'
import Modal from '../modal/Modal'
import MentorSchedule from './MentorSchedule'

const MentorScheduleModal = ({user, mentorId}) => {
    const [showMentorSchedule, setShowMentorSchedule] = useState(false)

    const onCloseMentorScheduleModal = () => setShowMentorSchedule(false)
    const onOpenMentorScheduleModal = () => setShowMentorSchedule(true)

    return (
        <div>
            <button onClick={onOpenMentorScheduleModal}>Open Mentor Schedule (Mentor Page)</button>
            <Modal show={showMentorSchedule} onClose={onCloseMentorScheduleModal}>
                <MentorSchedule user={user} mentorId={mentorId} />
            </Modal>
        </div>
    )
}

export default MentorScheduleModal