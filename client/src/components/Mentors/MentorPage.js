import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PROFILE_IMG } from "../../Constants"
import "./MentorPage.css"
import Rating from '@mui/material/Rating';
import { fetchMentorById } from '../../MentorsApi'

function MentorPage() {
    let { mentorID } = useParams();
    const [mentor, setMentor] = useState(null);
    console.log(mentor);
    useEffect(() => {
        const getMentor = async () => {
            const mentor = await fetchMentorById(mentorID)
            setMentor(mentor)
        }
        getMentor()
    }, []);

    return (
        mentor && <div className="mentor-container">
            <div>
                <div className="picture">{<img className="mentor-profile" src={mentor.user.picture || PROFILE_IMG}></img>}</div>
                <div className="mentor-info">
                    <div className="full-name">{`${mentor.user.firstName} ${mentor.user.lastName}`}</div>
                    <div className="Education-work">
                        Education and work: {mentor.workExperience}
                    </div>
                </div>
                <h4 className="contact-details">Contact Details:</h4>
                <div className="contact-details-container">
                    <div className="phoneNumber">
                        Email: {mentor.user.email}
                    </div>
                    <div className="phoneNumber">
                        Phone Number: {mentor.contactDetails.phoneNumber}
                    </div>
                    <div className="linkedIn">
                        linkedIn: {mentor.contactDetails.linkedinUrl}
                    </div>
                    <div className="gitHub">gitHub:{mentor.contactDetails.githubUrl}</div>
                </div>
            </div>
            <div className="skills-container">
                <div className="skills">
                    {mentor.skills.map((skill) => (
                        <ol>
                            <il className="skill-info"><i className={`programming lang-${skill.name.toLowerCase()}`}></i>
                                {`${skill.name}`} <Rating name="read-only" value={skill.rating} readOnly />
                            </il>
                            <p className="skill-description">{skill.description} </p>
                        </ol>
                    ))}
                </div>
            </div>
        </div>);
}

export default MentorPage;
