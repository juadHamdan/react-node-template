import "./mentor-page.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_USER_PICTURE } from "../../../Constants"
import Rating from '@mui/material/Rating';
import { fetchMentorById } from '../../../MentorsApi'
import MentorSchedule from "../../schedules/MentorSchedule";

function MentorPage({ user }) {
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
        mentor &&
        <div id="mentor-page-container">
            <div className="mentor-info-container">
                <div className="image-container"><img src={mentor.user.picture || DEFAULT_USER_PICTURE} /></div>
                <hr />
                <div className="name">{`${mentor.user.firstName} ${mentor.user.lastName}`}</div>
                <div className="experience">Education and work: {mentor.workExperience}</div>
                <hr />
                <div className="email">Email: {mentor.user.email}</div>
                <p className="contact-info-title">CONTACT INFORMATION</p>
                <div className="phone-number">Phone Number: {mentor.contactDetails.phoneNumber}</div>
                <div className="linkedIn">linkedIn: {mentor.contactDetails.linkedinUrl}</div>
                <div className="gitHub">gitHub:{mentor.contactDetails.githubUrl}</div>
            </div>



            <div>
                <div className="skills-container">
                    sdfsdf
                    sdfsdfsdf
                    sdf
                    sdfsdfsdfsdfs
                    sdfsdf
                </div>
                <hr/>
                <div className="scheduler-container">
                    <MentorSchedule user={user} mentorId={mentor.user._id} />
                </div>
            </div>


        </div>
    );
}

export default MentorPage;


/*

                    <div className="skills">
                        {mentor.skills.map((skill) => (
                            <ol key={skill}>
                                <il className="skill-info"><i className={`programming lang-${skill.name.toLowerCase()}`}></i>
                                    {`${skill.name}`} <Rating name="read-only" value={skill.rating} readOnly />
                                </il>
                                <p className="skill-description">{skill.description} </p>
                            </ol>
                        ))}
                    </div>

                    */