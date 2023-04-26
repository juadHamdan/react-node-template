import './mentor-card.css'
import MailIcon from '@mui/icons-material/Mail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';
import {DEFAULT_USER_PICTURE} from '../../../Constants'
import Rating from '@mui/material/Rating';

const MentorCard = ({ mentor, isHorizontalView = false }) => {
    const navigate = useNavigate()

    return (
        <div id="mentor-card" onClick={() => navigate('/mentors/' + mentor._id)}>
            {isHorizontalView ?
                <div id="mentor-card-horizontal">
                    <div className="image-container">
                        <img src={mentor.user.picture || DEFAULT_USER_PICTURE} />
                    </div>
                    <div className="mentor-data">
                        <p className="name">{mentor.user.firstName} {mentor.user.lastName}</p>
                        <p className="experience">{mentor.workExperience}</p>
                        <small><strong>Skills:</strong></small>
                        <p className="skills">
                            {mentor.skills.map(skill => <div className="skill">
                                {skill.name}
                                <Rating name="read-only" value={skill.rating} size="small" readOnly />
                            </div>)}
                        </p>
                    </div>
                    <div className="links">
                        <GitHubIcon className="icon" onClick={() => window.open(mentor.contactDetails.githubUrl, "popup")} />
                        <LinkedInIcon className="icon" onClick={() => window.open(mentor.contactDetails.linkedinUrl, "popup")} />
                        <MailIcon className="icon" onClick={() => window.open(`mailto:${mentor.user.email}?subject=Hook A Mentor User Message`, '_self')} />
                    </div>
                </div>
            :
            <div id="mentor-card-vertical">
                <div className="image-container">
                    <img src={mentor.user.picture || DEFAULT_USER_PICTURE} />
                </div>
                <div className="mentor-data">
                    <p className="name">{mentor.user.firstName} {mentor.user.lastName}</p>
                    <p className="experience">{mentor.workExperience}</p>
                    <p className="skills-title">Skills:</p>
                    <div className="skills">
                        {mentor.skills.map(skill => 
                            <div key={skill._id} className="skill">
                                {skill.name} 
                                <Rating name="read-only" value={skill.rating} size="small" readOnly />
                            </div>)}
                    </div>
                </div>
                <div className="links">
                    <GitHubIcon className="icon" onClick={() => window.open(mentor.contactDetails.githubUrl, "popup")} />
                    <LinkedInIcon className="icon" onClick={() => window.open(mentor.contactDetails.linkedinUrl, "popup")} />
                    <MailIcon className="icon" onClick={() => window.open(`mailto:${mentor.user.email}?subject=Hook A Mentor User Message`, '_self')} />
                </div>
            </div>
            }
        </div>
    )
}

export default MentorCard