import './landing.css'
import { useState, useEffect } from 'react'
import About from './about/About';
import { fetchCompanies } from '../../CompanyApi'

const Landing = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const getCompanies = async () => {
      const fetchedCompanies = await fetchCompanies()
      setCompanies(fetchedCompanies)
    }
    getCompanies()
  }, [])

  return (
    <div id="landing-container">
      <About />
      <div className="companies-container">
        <p className="title">Our Partners</p>
        <div className="companies">
          {companies.map(company =>
            <div className="company-card">
              <p className="name">{company.name}</p>
              <img src={company.logoUrl} />
            </div>

          )}
        </div>
      </div>
    </div>
  )
}

export default Landing