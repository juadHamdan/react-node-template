import './company.css'
import { useState, useEffect } from 'react'
import { fetchCompanyPendingUsers, fetchCompanyUsers } from '../../CompanyApi'
import { approveUser } from '../../MentorsApi'
import VerifiedIcon from '@mui/icons-material/Verified';

const Company = ({ company }) => {
    console.log(company)
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])
    const [mentors, setMentors] = useState([])
    const [mentees, setMentees] = useState([])


    useEffect(() => {
        //Promise.All concept
        if (company) {
            const getCompanyUsers = async () => {
                const fetchedCompanyUsers = await fetchCompanyUsers(company._id)
                //console.log()
                setCompanyUsers(fetchedCompanyUsers)
                setMentees(fetchedCompanyUsers.filter(user => !user.isMentor))
                setMentors(fetchedCompanyUsers.filter(user => user.isMentor))
            }
            getCompanyUsers()
            const getCompanyPendingUsers = async () => {
                const fetchedCompanyFetchedUsers = await fetchCompanyPendingUsers(company._id)
                setCompanyPendingUsers(fetchedCompanyFetchedUsers)
            }
            getCompanyPendingUsers()
        }
    }, [])


    const onApproveUser = async (userId, index) => {
        await approveUser(userId)
        const newPendingUsers = [...companyPendingUsers]
        newPendingUsers.splice(index, 1)
        setCompanyPendingUsers(newPendingUsers)
    }

    return (
        <div id="company-container">
            <div>Display Company Data and allow for edit (and Add)</div>

            <div className="approve-pending-users-container">
                <p className="sub-title">Approve Pending Users:</p>
                <div className="list">
                    <div className="list-item list-header">
                        <p>{' '}</p> |
                        <p className="list-item-header">Picture</p> | 
                        <p className="list-item-header">Full Name</p> | 
                        <p className="list-item-header">Email</p> 
                    </div>
                    {companyPendingUsers && companyPendingUsers.map((pendingUser, index) =>
                        <div className="list-item" >
                            <VerifiedIcon className="approve-icon" onClick={() => onApproveUser(pendingUser._id, index)} /> |
                            <img src={pendingUser.picture} /> | 
                            <p>{pendingUser.firstName} {pendingUser.lastName}</p> | 
                            <p>{pendingUser.email}</p> 
                        </div>)}
                </div>
            </div>

            <div className="mentors-container">
                <p className="sub-title">Our Mentors:</p>
                <div className="list">
                <div className="list-item list-header">
                        <p className="list-item-header">Page</p> |
                        <p className="list-item-header">Picture</p> | 
                        <p className="list-item-header">Full Name</p> | 
                        <p className="list-item-header">Email</p> 
                    </div>
                    {mentors && mentors.map((mentor, index) =>
                        <div className="list-item" >
                            <button>Mentor Page</button> |
                            <img src={mentor.picture} /> |
                            <p>{mentor.firstName} {mentor.lastName}</p> |
                            <p>{mentor.email}</p> 
                        </div>)}
                </div>
            </div>

            <div className="mentees-container">
                <p className="sub-title">Our Mentees:</p>
                <div className="list">
                <div className="list-item list-header">
                        <p className="list-item-header">Picture</p> | 
                        <p className="list-item-header">Full Name</p> | 
                        <p className="list-item-header">Email</p> 
                    </div>
                    {mentees && mentees.map((mentee, index) =>
                        <div className="list-item" >
                            <img src={mentee.picture} /> |
                            <p>{mentee.firstName} {mentee.lastName}</p> |
                            <p>{mentee.email}</p>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default Company