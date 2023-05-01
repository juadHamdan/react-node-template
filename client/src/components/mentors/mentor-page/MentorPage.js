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
import { getReviews } from "../../../MeetingsApi"
import Review from "../mentor-review/Review";
import Grid from "@mui/material/Grid";

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

function MentorPage({ user }) {
    const scheduleRef = useRef(null)
    const [mentor, setMentor] = useState(null);
    const [reviews, setReviews] = useState([]);
    let { mentorID } = useParams();

    useEffect(() => {
        const getMentor = async () => {
            const mentor = await fetchMentorById(mentorID)
            setMentor(mentor)
        }
        const getReviewsFromDB = async () => {
            const reviews = await getReviews(mentorID);
            console.log(reviews);
            setReviews(reviews);
        }
        getMentor()
        getReviewsFromDB()
    }, []);


    return (
        mentor &&
        <div id="mentor-page-background">
            <div id="mentor-page-container">
                <Grid className="grid-container" container spacing={2}>
                    <Grid item sm={12} md={12} lg={6}>
                        <div className="mentor-data-container">
                            <div className="image-container"><img src={mentor.user.picture || DEFAULT_USER_PICTURE} /></div>
                            <div className="contact-info-container">
                                <div className="name">{`${mentor.user.firstName} ${mentor.user.lastName}`}</div>
                                <div className="position">Position: {mentor.workExperience}</div>

                                <p className="contact-info-title">CONTACT INFORMATION</p>
                                <div className="phone-number-container">
                                    <strong>Phone:</strong>
                                    {mentor.contactDetails.phoneNumber}
                                </div>
                                <br />
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
                                        <p>Show Meetings</p>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Grid>
                    <Grid item sm={12} md={12} lg={6}>
                        <div className="skills-container">
                            <div className="title">My Skills:</div>
                            <div className="skills">
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
                    </Grid>
                    <Grid item sm={12} md={12} lg={6}>
                        <div className="reviews-container">
                            <p className="title">Reviews</p>
                            {reviews && reviews.map(review => <Review review={review} />)}
                        </div>
                    </Grid>
                    <Grid item sm={12} md={12} lg={6}>

                        <div className="scheduler-container" ref={scheduleRef}>
                            <p className="title">My schedule:</p>
                            <MentorSchedule user={user} mentorId={mentor.user._id} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default MentorPage;