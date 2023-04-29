import './company.css'
import {useState, useEffect} from 'react'
import {fetchCompanyPendingUsers, fetchCompanyUsers} from '../../CompanyApi'

const Company = () => {
    const [companyUsers, setCompanyUsers] = useState([])
    const [companyPendingUsers, setCompanyPendingUsers] = useState([])

    useEffect(() => {
        //Promise.All concept
        const getCompanyUsers = async () => setCompanyUsers(await fetchCompanyUsers())
        getCompanyUsers()
        const getCompanyPendingUsers = async () => setCompanyPendingUsers(await fetchCompanyPendingUsers())
        getCompanyPendingUsers()
    }, [])
  return (
    <div>
        <div>Display Company Data and allow for edit (and Add)</div>
        {companyPendingUsers.map(pendingUser => pendingUser.firstName)}
    </div>
  )
}

export default Company