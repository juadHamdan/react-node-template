import './landing.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import Mentors from '../mentors/Mentors'
import TextField from '@mui/material/TextField';
import LaunchIcon from '@mui/icons-material/Launch';

const Landing = () => {
  const [skillNameInput, setSkillNameInput] = useState("");
  const [searchedMentors, setSearchedMentors] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
      axios.get('/mentors').then(response => { 
      setMentors(response.data)
      }).catch(error => {
          console.log(error);
      })
  }, []);

  const handleChange = (event) => {
    const input = event.target.value
    setSkillNameInput(input)
  }

  const searchMentorBySkill = (e) => {
    e.preventDefault()
    console.log(skillNameInput)
    axios.get('/mentors?skill=' + skillNameInput).then(response => { 
      setSearchedMentors(response.data)
      console.log(response.data)
      }).catch(error => {
          console.log(error);
      })
  }

  return (
    <div id="landing-container">

      <div class="about-container">
        <h1 class="about-header">
          "Alone we can do so little, together we can do so much."
          <br /> - Helen Keller
        </h1>
        <h2 class="about-title-header">Why Hook A Mentor?</h2>
        <p class="about-text">
          Our website is designed to connect individuals who are seeking guidance and mentorship with experienced professionals
          <hr />
          Our website allows users to search for mentors based on skills.
          Users can view the profiles of potential mentors, read their bios and reviews,
          and select the mentor that best fits their needs.
          Once a mentor is selected, users can connect with them directly through our platform to schedule sessions, ask questions, and receive guidance.
          <br />
        </p>
      </div>

      <div className="mentors">

        <div className="search-mentors">
          <h3>Look For A Mentor:</h3>
          <form onSubmit={searchMentorBySkill}>
            <TextField value={skillNameInput} fullWidth id="outlined-basic" label="Search Mentors By Skill" variant="outlined" onChange={handleChange} />
            <button type="submit">Search</button>
          </form>
          
          {searchedMentors.length === 0 ? null :
            <div className="menu">
              {searchedMentors.map(mentor =>
                <div key={mentor._id} className="menu-item">
                  <p>{mentor.user.firstName} {mentor.user.lastName}</p>
                  <LaunchIcon />
                </div>
              )}
            </div>
          }
        </div>
        {searchedMentors.length === 0 && 
        <>
          <h3>Featured Mentors:</h3>
          <Mentors mentors={mentors}/>
        </>
}
      </div>
    </div>
  )
}

export default Landing


//TODO: auto complete the skill name input (by the fetched dataset of skills)
//fetch (axios) by seperate file