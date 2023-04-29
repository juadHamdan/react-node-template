import './company.css'
import {useState, useEffect} from 'react'
import {fetchCompanyPendingUsers, fetchCompanyUsers , fetchCompanyMentors} from '../../CompanyApi'
import {approveUser} from '../../MentorsApi'
import BiChart from '../charts/BiChart'
import ColumnChart from '../charts/ColumnChart'
const Company = ({company}) => {
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])
    const [companyMentors , setCompanyMentors] = useState([])
    const [numOfMentors , setNumOfMentors] = useState(0)
    const [numOfUsers , setNumOfUsers] = useState(0)
    const [numOfPendign , setNumOfPendign] = useState(0)
    const [skillsCount , setSkillsCount] = useState({})
    useEffect(() => {
        if(company){

            const getCompanyUsers = async () => {
                const fetchedCompanyUsers = await fetchCompanyUsers(company._id)
                setCompanyUsers(fetchedCompanyUsers)
                const mentees = fetchedCompanyUsers.filter(user => !user.isMentor)
                const mentors = fetchedCompanyUsers.filter(user => user.isMentor)
                setNumOfMentors(mentors.length)
                setNumOfUsers(mentees.length)
            }
            getCompanyUsers()

            const getCompanyPendingUsers = async () => {
                const fetchedCompanyFetchedUsers = await fetchCompanyPendingUsers(company._id)
                setCompanyPendingUsers(fetchedCompanyFetchedUsers)
                setNumOfPendign(fetchedCompanyFetchedUsers.length)
            }
            getCompanyPendingUsers()

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
    <div>
        <div>Display Company Data and allow for edit (and Add)</div>
        {companyPendingUsers && companyPendingUsers.map((pendingUser, index) => 
            <div onClick={() => onApproveUser(pendingUser._id, index)}>{pendingUser.firstName}</div>)}
            { numOfMentors && numOfUsers && numOfPendign && <BiChart mentors={numOfMentors} users={numOfUsers} pending={numOfPendign}/>}
            { skillsCount && <ColumnChart mapskills={skillsCount} />}
            
    </div>
  )
}

export default Company