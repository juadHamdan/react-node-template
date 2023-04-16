import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom"
import { fetchMentorById } from '../../MentorsApi'

function MentorPage() {
  const { id } = useParams()
  console.log(id)
  const [mentor, setMentor] = useState(null)

  useEffect(() => {
    const getMentor = async () => {
      const mentor = await fetchMentorById(id)
      setMentor(mentor)
    }
    getMentor()
  }, []);

  return (
    <div id="mentor-container">
      {mentor ?
        <>
          {mentor.user.picture && (
            <div className="picture">{mentor.user.picture}</div>
          )}
          <div className="full-name">{`${mentor.user.firstName} ${mentor.user.lastName}`}</div>
          <div className="position">position at company:{mentor.user.position}</div>
          <div className="Education-work">
            Education and work:{mentor.workExperience}
          </div>
          <h1 className="contact-details">Contact Details:</h1>
          <div className="contact-details-container">
            <div className="phoneNumber">
              phoneNumber:{mentor.contactDetails.phoneNumber}
            </div>
            <div className="linkedIn">
              linkedIn:{mentor.contactDetails.linkedIn}
            </div>
            <div className="gitHub">gitHub:{mentor.contactDetails.gitHub}</div>
          </div>
          <div className="skills-container">
            <div className="skills">
              {mentor.skills.map((skill) => (
                <il>{skill.name}</il>
              ))}
            </div>
          </div>
        </>
        : null}
    </div>
  );
}

export default MentorPage;

// picture => picture file (.png, jpg)
// pictureUrl => link
