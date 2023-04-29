import './company.css'
import { useState, useEffect } from 'react'
import { fetchCompanyPendingUsers, fetchCompanyUsers, fetchFutureMeetings } from '../../CompanyApi'
import { approveUser } from '../../MentorsApi'
import CustomizedTables from "../../table/table"

const Company = ({ company }) => {
    console.log(company)
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])
    const [futureMeetings, setFutureMeetings] = useState([])

    useEffect(() => {
        //Promise.All concept
        if (company) {
            const getCompanyUsers = async () => {
                const fetchedCompanyUsers = await fetchCompanyUsers(company._id)
                setCompanyUsers(fetchedCompanyUsers)
                const mentees = fetchedCompanyUsers.filter(user => !user.isMentor)
                const mentors = fetchedCompanyUsers.filter(user => user.isMentor)
                const numOfMentors = mentors.length
                const numOfMentees = mentees.length
            }
            getCompanyUsers()
            const getCompanyPendingUsers = async () => {
                const fetchedCompanyFetchedUsers = await fetchCompanyPendingUsers(company._id)
                setCompanyPendingUsers(fetchedCompanyFetchedUsers)
                const numOfPendign = fetchedCompanyFetchedUsers.length
            }
            getCompanyPendingUsers()

            const getFutureMeetings = async () => {
                const fetchedMeetings = await fetchFutureMeetings(company._id)
                setFutureMeetings(fetchedMeetings)
            }
            getFutureMeetings()
        }
    }, [])

    const onApproveUser = async (userId, index) => {
        await approveUser(userId)
        const newPendingUsers = [...companyPendingUsers]
        newPendingUsers.splice(index, 1)
        setCompanyPendingUsers(newPendingUsers)
    }
    console.log(futureMeetings);
    return (
        <div>
            <div>Display Company Data and allow for edit (and Add)</div>
            {companyPendingUsers && companyPendingUsers.map((pendingUser, index) =>
                <div onClick={() => onApproveUser(pendingUser._id, index)}>{pendingUser.firstName}</div>)}
            <CustomizedTables meetings={futureMeetings} />
        </div>
    )
}

export default Company