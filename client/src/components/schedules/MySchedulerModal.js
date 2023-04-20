import { useState } from 'react'
import Modal from '../modal/Modal'
import MyScheduler from './MyScheduler'

//fetch => map to add is Booked ()

const MySchedulerModal = () => {
    const [showScheduler, setShowScheduler] = useState(false)

    const [meetings, setMeetings] = useState([
        {
            title: "React Lesson",
            startDate: new Date(2023, 3, 21, 9, 35).toISOString(),
            endDate: new Date(2023, 3, 21, 11, 30).toISOString(),
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
        


    
    const onCloseSchedulerModal = () => setShowScheduler(false)
    const onOpenSchedulerModal = () => setShowScheduler(true)

    return (
        <div>
            <button onClick={onOpenSchedulerModal}>Open Scheduler (Mentor Profile Page)</button>
            <Modal show={showScheduler} onClose={onCloseSchedulerModal}>
                <MyScheduler meetings={meetings} />
            </Modal>
        </div>
    )
}

export default MySchedulerModal