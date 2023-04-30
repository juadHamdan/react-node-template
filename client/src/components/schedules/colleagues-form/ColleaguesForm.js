import './colleagues-form.css'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { fetchCompanyUsers } from '../../../CompanyApi'

const ColleaguesForm = ({ onAddColleague, user }) => {
    const [colleagueNameInput, setColleagueNameInput] = useState("")
    const [colleagues, setColleagues] = useState([])
    const [showColeaguesMenu, setShowColeaguesMenu] = useState(false)

    useEffect(() => {
        const getColleagues = async () => {
            let mentors = await fetchCompanyUsers(user.companyID);
            let index = mentors.findIndex(mentor => mentor.email === user.email)
            mentors.splice(index, 1)
            setColleagues(mentors);
        };
        getColleagues();
    }, []);

    const handleAddColleague = (colleague) => {
        setColleagueNameInput(`${colleague.firstName} ${colleague.lastName}`)
        onAddColleague(colleague)
        setColleagues([])
    }

    const handleChange = (event) => {
        const input = event.target.value
        setColleagueNameInput(input)
        setColleagues(colleagues.filter(colleague => colleague.firstName.toLowerCase().startsWith(input.toLowerCase())))
    }

    return (
        <div id="colleagues-form-container">
            <div className="search-colleagues">
                <TextField value={colleagueNameInput} fullWidth onClick={() => setShowColeaguesMenu(showColeaguesMenu => !showColeaguesMenu)} className="input" label="Choose A Colleage" variant="outlined" onChange={handleChange} />
                {colleagues.length > 0 && showColeaguesMenu &&
                    <div className="menu">
                        {colleagues.map(colleague =>
                            <div key={colleague._id} className="menu-item" onClick={() => handleAddColleague(colleague)}>
                                <img src={colleague.picture} />
                                <p className="name">{colleague.firstName} {colleague.lastName}</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default ColleaguesForm