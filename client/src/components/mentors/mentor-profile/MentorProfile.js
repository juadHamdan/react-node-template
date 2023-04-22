import "./mentor-profile.css"
import { useEffect, useState , useRef } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_USER_PICTURE } from "../../../Constants"
import Rating from '@mui/material/Rating';
import { fetchMentorByUserId, updateMentor } from '../../../MentorsApi'

function MentorProfile() {
    let { userID } = useParams();
    const [mentor, setMentor] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [editMode, setEditMode] = useState('');

    useEffect(() => {
        const getMentor = async () => {
            const mentor = await fetchMentorByUserId(userID)
            setMentor(mentor)
            setFirstName(mentor.user.firstName)
            setLastName(mentor.user.lastName)
            setWorkExperience(mentor.workExperience)
            setEmail(mentor.user.email)
            setPhoneNumber(mentor.contactDetails.phoneNumber)
            setLinkedinUrl(mentor.contactDetails.linkedinUrl)
            setGithubUrl(mentor.contactDetails.githubUrl)
        }
        getMentor()
    }, []);

    
    const handleWorkExperienceChange = (event) => {
        setWorkExperience(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const handleLinkedinUrlChange = (event) => {
        setLinkedinUrl(event.target.value);
    }

    const handleGithubUrlChange = (event) => {
        setGithubUrl(event.target.value);
    }

    const handleSave = async () => {
        setEditMode('');
        const updatedMentor = {
            ...mentor,
            user: {
                ...mentor.user,
                firstName,
                lastName,
                email
            },
            workExperience,
            contactDetails: {
                ...mentor.contactDetails,
                phoneNumber,
                linkedinUrl,
                githubUrl
            }
        }
        await updateMentor(userID ,updatedMentor);
        setMentor(updatedMentor);
    }


    const emailInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);
    const linkedinInputRef = useRef(null);
    const githubInputRef = useRef(null);
    const workExperienceInputRef = useRef(null);


    const handleClickOutside = (ref, event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setEditMode('');
      }
    };
    
    useEffect(() => {
      const handleOutsideClick = (event) => {
        handleClickOutside(emailInputRef, event);
        handleClickOutside(phoneNumberInputRef, event);
        handleClickOutside(linkedinInputRef, event);
        handleClickOutside(githubInputRef, event);
        handleClickOutside(workExperienceInputRef, event);
      };
    
      document.addEventListener('mousedown', handleOutsideClick);
    
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
    



    return (
      mentor && <div className="mentor-container">
      <div>
        <div className="picture">
          {<img className="mentor-profile" src={mentor.user.picture || DEFAULT_USER_PICTURE}></img>}
        </div>
        <div className="mentor-info">
          <div className="full-name">{`${mentor.user.firstName} ${mentor.user.lastName}`}</div>         
          <div className="Education-work">
            <div className="section-header">
              <span>Education and Work:</span>
              <button onClick={() => setEditMode('education-work')}>Edit</button>
            </div>
            {editMode === 'education-work' ?
              <textarea value={workExperience} onChange={handleWorkExperienceChange} ref={workExperienceInputRef}/>
              :
              <div className="info-text">{workExperience}</div>
            }
          </div>
        </div>
        <h4 className="contact-details">Contact Details:</h4>
        <div className="contact-details-container">
          <div className="phoneNumber">
            <div className="section-header">
              <span>Email:</span>
              <button onClick={() => setEditMode('email')}>Edit</button>
            </div>
            {editMode === 'email' ?
              <input type="text" value={email} onChange={handleEmailChange} ref={emailInputRef}/>
              :
              <div className="info-text">{email}</div>
            }
          </div>
          <div className="phoneNumber">
            <div className="section-header">
              <span>Phone Number:</span>
              <button onClick={() => setEditMode('phone-number')}>Edit</button>
            </div>
            {editMode === 'phone-number' ?
              <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} ref={phoneNumberInputRef} />
              :
              <div className="info-text">{phoneNumber}</div>
            }
          </div>
          <div className="linkedIn">
            <div className="section-header">
              <span>LinkedIn:</span>
              <button onClick={() => setEditMode('linkedin')}>Edit</button>
            </div>
            {editMode === 'linkedin' ?
              <input type="text" value={linkedinUrl} onChange={handleLinkedinUrlChange} ref={linkedinInputRef} />
              :
              <div className="info-text">{linkedinUrl}</div>
            }
          </div>
          <div className="gitHub">
            <div className="section-header">
              <span>GitHub:</span>
              <button onClick={() => setEditMode('github')}>Edit</button>
            </div>
            {editMode === 'github' ?
              <input type="text" value={githubUrl} onChange={handleGithubUrlChange} ref={githubInputRef} />
              :
              <div className="info-text">{githubUrl}</div>
            }
          </div>
        </div>
        <button onClick={handleSave}>Save Changes</button>
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
      </div>
  );  
  
            }
export default  MentorProfile