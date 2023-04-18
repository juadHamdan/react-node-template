import { useEffect, useState } from "react";
import { fetchMentorsNames } from "../../../MentorsApi"
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

const NamesSearch = () => {
    const [mentorName, setMentorName] = useState("")
    const [searchedMentors, setSearchedMentors] = useState([])
    const [mentorsNames, setMentorsNames] = useState([]);

    useEffect(() => {
        const getMentorsNames = async () => {
            const names = await fetchMentorsNames()
            setMentorsNames(names)
        }
        getMentorsNames()
    }, [])

    const handleChange = (event) => {
        const input = event.target.value
        setMentorName(input)
        if (input === "") {
            setSearchedMentors([]);
        }
        else {
            setSearchedMentors([...mentorsNames.filter(mentor => mentor.fullName.toLowerCase().startsWith(input.toLowerCase()))])
        }
    }

    return (<div id="skills-search-form-container">
        <div className="search-skills">
            <TextField value={mentorName} fullWidth className="input" id="outlined-basic" label="Type Mentor Name" variant="outlined" onChange={handleChange} />
            {searchedMentors.length === 0 ? null :
                <div className="menu">
                    {searchedMentors.map(mentor =>
                        <Link key={mentor._id} to={`/mentors/${mentor._id}`}>
                            <div key={mentor} className="menu-item">
                                {mentor.fullName}
                            </div>
                        </Link>
                    )}
                </div>
            }
        </div>
    </div>)

}

export default NamesSearch