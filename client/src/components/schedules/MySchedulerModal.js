import { useState } from 'react'
import Modal from '../modal/Modal'
import MyScheduler from './MyScheduler'

const MySchedulerModal = ({user}) => {
    const [showScheduler, setShowScheduler] = useState(false)
    
    const onCloseSchedulerModal = () => setShowScheduler(false)
    const onOpenSchedulerModal = () => setShowScheduler(true)

    return (
        <div>
            <button onClick={onOpenSchedulerModal}>Open Scheduler (Mentor Profile Page)</button>
            <Modal show={showScheduler} onClose={onCloseSchedulerModal}>
                {user && <MyScheduler user={user} />}
            </Modal>
        </div>
    )
}

export default MySchedulerModal