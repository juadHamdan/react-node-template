import './company.css'
import {useState, useEffect} from 'react'
import {fetchCompanyPendingUsers, fetchCompanyUsers} from '../../CompanyApi'
import {approveUser} from '../../MentorsApi'

const Company = ({company}) => {
    console.log(company)
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])

    useEffect(() => {
        //Promise.All concept
        if(company){
            const getCompanyUsers = async () => {
                const fetchedCompanyUsers = await fetchCompanyUsers(company._id)
                //console.log()
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
        }
    }, [])


    const onApproveUser = async (userId, index) => {
        await approveUser(userId)
        const newPendingUsers = [...companyPendingUsers]
        newPendingUsers.splice(index, 1)
        setCompanyPendingUsers(newPendingUsers)
    }

  return (
    <div>
        <div>Display Company Data and allow for edit (and Add)</div>
        {companyPendingUsers && companyPendingUsers.map((pendingUser, index) => 
            <div onClick={() => onApproveUser(pendingUser._id, index)}>{pendingUser.firstName}</div>)}
    </div>
  )
}

export default Company