import './company.css'
import { useState, useEffect } from 'react'
import { fetchCompanyPendingUsers, fetchCompanyUsers, fetchCompanyMentors, fetchFutureMeetings } from '../../CompanyApi'
import { approveUser } from '../../MentorsApi'
import BiChart from '../charts/BiChart'
import ColumnChart from '../charts/ColumnChart'

import { DEFAULT_USER_PICTURE } from '../../Constants'
import Table from '../table/Table'
import MentorsTable from "../table/MentorTable"
import MenteesTable from "../table/MenteeTable"
import PendingTable from '../table/PendingTable'


const Company = ({ company, onLogout }) => {
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])
    const [mentors, setMentors] = useState([])
    const [mentees, setMentees] = useState([])
    const [companyMentors, setCompanyMentors] = useState([])
    const [numOfMentors, setNumOfMentors] = useState(0)
    const [numOfUsers, setNumOfUsers] = useState(0)
    const [numOfPendign, setNumOfPendign] = useState(0)
    const [skillsCount, setSkillsCount] = useState({})
    const [futureMeetings, setFutureMeetings] = useState(null)
    const [activeBtn, setActiveBtn] = useState(0)

    useEffect(() => {
        console.log(company);
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
                console.log(fetchedMeetings);
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
    const onRejectUser = async (userId, index) => {
        //await rejectUser(userId)
        const newPendingUsers = [...companyPendingUsers]
        newPendingUsers.splice(index, 1)
        setCompanyPendingUsers(newPendingUsers)
    }


    return (
        <div id="company-container">
            <div className="sidebar-placeholder">
                <div className="sidebar-container">
                    <div className="company-details">
                        <img src={company.logoUrl || DEFAULT_USER_PICTURE} />
                        <p className="name">{company.name}</p>
                        <button className="logout-btn" onClick={onLogout}>Logout</button>
                    </div>

                    <div className="routes">
                        <button onClick={() => setActiveBtn(0)} className={`route ${activeBtn === 0 && "route-active"}`}>Mentees & Mentors</button>
                        <button onClick={() => setActiveBtn(1)} className={`route ${activeBtn === 1 && "route-active"}`}>Meetings</button>
                        <button onClick={() => setActiveBtn(2)} className={`route ${activeBtn === 2 && "route-active"}`}>Data & Statistics</button>
                    </div>

                    <div className="footer">&#174;BookAMentor</div>
                </div>

            </div>

            <div className="company-page-container">
                <div
                    className="app-logo-container"
                    onClick={() => (window.location.href = "/")}
                >
                    <img
                        className="app-icon"
                        src="https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Laptop-Code-icon.png"
                    />
                    <h2>Book A Mentor</h2>
                </div>



                {activeBtn === 1 &&
                    <div className="meetings-container">
                        <p className="title">{futureMeetings.length != 0 ? "Upcoming Meetings:" : "There is no upcoming meetings"}</p>
                        {futureMeetings && futureMeetings.length != 0 && <Table data={futureMeetings} />}
                    </div>
                }

                {activeBtn === 2 &&
                    <div className="stats-container">
                        {numOfMentors && numOfUsers && numOfPendign && <BiChart mentors={numOfMentors} users={numOfUsers} pending={numOfPendign} />}
                        {skillsCount && <ColumnChart mapskills={skillsCount} />}
                    </div>
                }

                {activeBtn === 0 &&
                    <div className="users-container">
                        <div className="approve-pending-users-container">
                            <p className="sub-title">Approve Pending Users:</p>
                            <div className="list">
                                {companyPendingUsers && companyPendingUsers.length != 0 && <PendingTable companyPendingUsers={companyPendingUsers}
                                    onApproveUser={onApproveUser} onRejectUser={onRejectUser} />}
                            </div>
                        </div>

                        <div className="mentors-container">
                            <p className="sub-title">Our Mentors:</p>
                            <div className="list">
                                {mentors && mentors.length != 0 && <MentorsTable mentors={mentors} />}
                            </div>
                        </div>

                        <div className="mentees-container">
                            <p className="sub-title">Our Mentees:</p>
                            <div className="list">
                                {mentees && mentees.length != 0 && <MenteesTable mentees={mentees} />}
                            </div>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Company