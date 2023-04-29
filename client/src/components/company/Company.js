import './company.css'
import { useState, useEffect } from 'react'
import { fetchCompanyPendingUsers, fetchCompanyUsers, fetchFutureMeetings } from '../../CompanyApi'
import { approveUser } from '../../MentorsApi'
import CustomizedTables from "../../table/table"

const Company = ({ company }) => {
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])
    const [mentors, setMentors] = useState([])
    const [mentees, setMentees] = useState([])
    const [companyMentors, setCompanyMentors] = useState([])
    const [numOfMentors, setNumOfMentors] = useState(0)
    const [numOfUsers, setNumOfUsers] = useState(0)
    const [numOfPendign, setNumOfPendign] = useState(0)
    const [skillsCount, setSkillsCount] = useState({})
    const [futureMeetings, setFutureMeetings] = useState([])

    useEffect(() => {
        if (company) {
            const getCompanyUsers = async () => {
                const fetchedCompanyUsers = await fetchCompanyUsers(company._id)
                setCompanyUsers(fetchedCompanyUsers)
                const fetchedMentees = fetchedCompanyUsers.filter(user => !user.isMentor)
                const fetchedMentors = fetchedCompanyUsers.filter(user => user.isMentor)
                setNumOfMentors(fetchedMentors.length)
                setNumOfUsers(fetchedMentees.length)
                setMentees(fetchedMentees)
                setMentors(fetchedMentors)
            }
            getCompanyUsers()

            const getCompanyPendingUsers = async () => {
                const fetchedCompanyFetchedUsers = await fetchCompanyPendingUsers(company._id)
                setCompanyPendingUsers(fetchedCompanyFetchedUsers)
                setNumOfPendign(fetchedCompanyFetchedUsers.length)
            }
            getCompanyPendingUsers()

            const getFutureMeetings = async () => {
                const fetchedMeetings = await fetchFutureMeetings(company._id)
                setFutureMeetings(fetchedMeetings)
            }
            getFutureMeetings()
            const getCompanyMentors = async () => {
                const fetchedCompanyMentors = await fetchCompanyMentors(company._id)
                mapSkills(fetchedCompanyMentors)
                setCompanyMentors(fetchedCompanyMentors)
            }
            getCompanyMentors()
        }
    }, [])

    const mapSkills = (companyMentors) => {

        let arraySkills = []
        let countSkills = {}
        companyMentors.forEach((mentor) => { arraySkills.push(...mentor.skills) })
        arraySkills.forEach((skill) => {
            countSkills[skill.name] = countSkills[skill.name] ? countSkills[skill.name] + 1 : 1;
        })
        setSkillsCount(countSkills)
    }

    const onApproveUser = async (userId, index) => {
        await approveUser(userId)
        const newPendingUsers = [...companyPendingUsers]
        newPendingUsers.splice(index, 1)
        setCompanyPendingUsers(newPendingUsers)
    }

    return (
        <div id="company-container">
            <div>Display Company Data and allow for edit (and Add)</div>
            <CustomizedTables meetings={futureMeetings} />
            {numOfMentors && numOfUsers && numOfPendign && <BiChart mentors={numOfMentors} users={numOfUsers} pending={numOfPendign} />}
            {skillsCount && <ColumnChart mapskills={skillsCount} />}

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