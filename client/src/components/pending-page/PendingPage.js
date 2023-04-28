import { useState, useEffect } from 'react'
import { fetchCompanies, addPendingUserToCompany } from '../../CompanyApi'

const PendingPage = ({user}) => {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const getCompanies = async ()  => {
            setCompanies(await fetchCompanies())
        }
        getCompanies()
    }, [])

    const onCompanySubmit = async (companyId) => {
        await addPendingUserToCompany(companyId, user._id)
        alert("Requested To Join Company.")
    }

    return (
        <div>
            {companies.map(company => <button onClick={() => onCompanySubmit(company._id)}>{company.name}</button>)}
        </div>
    )
}

export default PendingPage