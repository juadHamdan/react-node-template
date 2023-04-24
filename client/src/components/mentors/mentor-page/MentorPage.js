import "./mentor-page.css"
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_USER_PICTURE } from "../../../Constants"
import Rating from '@mui/material/Rating';
import { fetchMentorById } from '../../../MentorsApi'
import MentorSchedule from "../../schedules/MentorSchedule";
import EmailIcon from '../../../assets/icons/email.svg'
import GithubIcon from '../../../assets/icons/github.svg'
import LinkedinIcon from '../../../assets/icons/linkedin.svg'
import ScheduleIcon from '../../../assets/icons/schedule.svg'

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

function MentorPage({ user }) {
    const scheduleRef = useRef(null)


    let { mentorID } = useParams();

    const [mentor, setMentor] = useState(null);

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
            <div className="mentor-data-container">
                <div className="image-container"><img src={mentor.user.picture || DEFAULT_USER_PICTURE} /></div>
                <div className="contact-info-container">
                    <div className="name">{`${mentor.user.firstName} ${mentor.user.lastName}`}</div>
                    <div className="experience">My Experience: {mentor.workExperience}</div>

                    <p className="contact-info-title">CONTACT INFORMATION</p>
                    <div className="phone-number-container">
                        <strong>Phone:</strong>
                        {mentor.contactDetails.phoneNumber}
                    </div>
                    <br/>
                    <div className="email-container">
                        <strong>Email:</strong>
                        {mentor.user.email}
                    </div>


                    <div className="hrefs-left">
                        <button className="href-btn github-btn" onClick={() => window.open(mentor.contactDetails.githubUrl, "popup")}>
                            <img className="logo" src={GithubIcon} />
                            <p>Github Profile</p>
                        </button>
                        <button className="href-btn linkedin-btn" onClick={() => window.open(mentor.contactDetails.linkedinUrl, "popup")}>
                            <img className="logo" src={LinkedinIcon} />
                            <p>LinkedIn Profile</p>
                        </button>
                    </div>

                    <div className="hrefs-right">
                        <button className="href-btn email-btn" onClick={() => window.open(`mailto:${mentor.user.email}?subject=Hook A Mentor User Message`, '_self')}>
                            <img className="logo" src={EmailIcon} />
                            <p>Send An Email</p>
                        </button>
                        <button className="href-btn schedule-btn" onClick={() => scrollToRef(scheduleRef)}>
                            <img className="logo" src={ScheduleIcon} />
                            <p>Book A Meeting</p>
                        </button>
                    </div>

                </div>


                <div className="skills-container">
                    <div className="skills">
                        <div className="title">My Skills:</div>
                        {mentor.skills.map(skill =>
                            <div key={skill._id} className="skill">
                                <p className="skill-name">{skill.name}</p>|
                                <p>{skill.experienceYears} Experience Years</p>|
                                <p>Last Usage In {skill.lastTimeUsed}</p>|
                                <div className="rating">
                                    <small>Overall:</small>
                                    <Rating name="read-only" value={skill.rating} size="small" readOnly />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="scheduler-container" ref={scheduleRef}>
                <h3>Choose Available Meeting Spot:</h3>
                <MentorSchedule user={user} mentorId={mentor.user._id} />
            </div>


        </div>
    );
}

export default MentorPage;