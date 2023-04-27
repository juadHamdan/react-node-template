import './colleagues-form.css'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import {fetchFeaturedMentors} from '../../../MentorsApi'

const ColleaguesForm = ({ onAddColleague }) => {
    const [colleagueNameInput, setColleagueNameInput] = useState("")
    const [colleagues, setColleagues] = useState([])
    const [showColeaguesMenu, setShowColeaguesMenu] = useState(false)

    useEffect(() => {
        const getColleagues = async () => {
            const mentors = await fetchFeaturedMentors();
            setColleagues(mentors);
          };
        getColleagues();
      }, []);



    const handleAddColleague = (id) => {
        onAddColleague(id)
        setColleagues([])
    }

    const handleChange = (event) => {
        const input = event.target.value
        setColleagueNameInput(input)
        setColleagues(colleagues.filter(colleague => colleague.user.firstName.toLowerCase().startsWith(input.toLowerCase())))
    }

    return (
        <div id="colleagues-form-container">
            <div className="search-colleagues">
                <TextField value={colleagueNameInput} fullWidth onClick={() => setShowColeaguesMenu(showColeaguesMenu => !showColeaguesMenu)} className="input" label="Choose A Colleage" variant="outlined" onChange={handleChange} />
                {colleagues.length > 0 && showColeaguesMenu && 
                    <div className="menu">
                        {colleagues.map(colleague =>
                            <div key={colleague._id} className="menu-item" onClick={() => handleAddColleague(colleague._id)}>
                                <img src={colleague.user.picture} />
                                <p className="name">{colleague.user.firstName} {colleague.user.lastName}</p>
                            </div>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}

export default ColleaguesForm