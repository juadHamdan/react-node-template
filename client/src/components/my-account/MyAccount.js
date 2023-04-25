import "./my-account.css";
import { deleteUserById } from "../../MentorsApi";
import { DEFAULT_USER_PICTURE } from '../../Constants'
import { useState, useRef, useEffect } from "react";
import axios from "axios"
import { fetchMentorByUserId, updateMentor } from '../../MentorsApi'
import TextField from '@mui/material/TextField';
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from '@mui/icons-material/Delete';

const MyAccount = ({ user, onDelete, setUpdatedUserPicture, UpdatedUserPicture }) => {
  /*const [mentorData, setMentorData] = useState({
    skills: [], workExperience: "", githubUrl: "", phoneNumber: "", linkedinUrl: ""
  });*/
  const [mentor, setMentor] = useState(null)
  const [skills, setSkills] = useState([])
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    const getMentor = async () => {
      const mentor = await fetchMentorByUserId(user._id)
      setMentor({ ...mentor, skills: [], githubUrl: mentor.contactDetails.githubUrl, phoneNumber: mentor.contactDetails.phoneNumber, linkedinUrl: mentor.contactDetails.linkedinUrl})
      setSkills(mentor.skills)
    }
    getMentor()
  }, []);

  const handleDelete = async () => {
    await deleteUserById(user._id);
    onDelete();
  }

  const fileSelectHandler = event => {
    event.preventDefault()
    let preview = URL.createObjectURL(event.target.files[0]);
    let data = event.target.files[0];
    let imageType = data.name.split(".")[1];
    if (imageType != "png" && imageType != "jpg" && imageType != "jpeg") {
      alert('Only .png, .jpg and .jpeg format allowed!');
      return;
    }
    setUpdatedUserPicture(preview);
    const formData = new FormData();
    formData.append('profileImg', data)
    axios.put(`/images/${user._id}`, formData, {
    }).then(res => {
      console.log(res)
    })
  }

  const handleClickOnChoosePhoto = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value)
    setMentor({ ...mentor, [event.target.name]: event.target.value })
  }

  const onUpdateMentor = () => {
    if(skills.length === 0){
      alert("Mentors Should Have At Least 1 Skill.")
      return
    }
    updateMentor(user._if, {...mentor, skills: skills})
  }

  const onAddSkill = () => {
    setSkills(skills => [...skills, { name: "", rating: 0, experienceYears: 0, lastTimeUsed: 0 }])
  }

  const handleSkillChange = (event, index) => {
    console.log(event.target.value)
    const newSkills = [...skills]
    newSkills[index] = { ...newSkills[index], [event.target.name]: event.target.value }
    setSkills(newSkills)
  }

  const deleteSkill = (index) => {
    const newSkills = [...skills]
    newSkills.splice(index, 1)
    setSkills(newSkills)
  }

  return (
    <div id="my-account-container">
      {user.isMentor ?
        mentor &&
        <div className="my-account mentor-account">
          <img style={{  borderRadius: '50%'}} src={UpdatedUserPicture || user.picture || DEFAULT_USER_PICTURE} />
          <h2 className="name">{user.firstName} {user.lastName}</h2>
          <h4 className="email">{user.email}</h4>
          <button className="btn choose-picture-btn" onClick={handleClickOnChoosePhoto}>Choose Photo</button>
          <button className="btn delete-btn" onClick={handleDelete}>Delete Account</button>
          <input type="file" name='file' ref={hiddenFileInput} style={{ display: 'none' }} onChange={fileSelectHandler} />
          
          
          
          <form className="mentor-info-form-container">
            <p className="sub-title">Update Your Professional Experience:</p>
            <div>
              <TextField className="text-input" name="workExperience" fullWidth value={mentor.workExperience} label="Work Experience (Company Name, years, ...)" variant="outlined" onChange={handleChange} />
              <TextField className="text-input" name="githubUrl" fullWidth value={mentor.githubUrl} label="Github Link" variant="outlined" onChange={handleChange} />
            </div>
            <p className="sub-title">Update Your Contact Info:</p>
            <div>
              <TextField className="text-input" disabled name="email" fullWidth value={mentor.user.email} label="Email" variant="outlined" />
              <TextField className="text-input" type="number" name="phoneNumber" fullWidth value={mentor.phoneNumber} label="Phone Number" variant="outlined" onChange={handleChange} />
              <TextField className="text-input" name="linkedinUrl" fullWidth value={mentor.linkedinUrl} label="LinkedIn Profile" variant="outlined" onChange={handleChange} />
            </div>
          </form>

          <p className="sub-title">Update Your Skills:</p>
          {skills.map((skill, index) => 
                <div className="skill-form">
                <TextField className="text-input" sx={{ width: 100 }} name="name" value={skill.name} label="SkillName" onChange={(e) => handleSkillChange(e, index)} variant="outlined" />
                <div>
                  <Typography component="legend">Knowledge</Typography>
                  <Rating name="rating" value={skill.rating} onChange={(e) => handleSkillChange(e, index)} />
                </div>
                <FormControl variant="outlined" sx={{ width: 100 }}>
                  <InputLabel>Experience Years</InputLabel>
                  <Select labelId="experience-years-label" name="experienceYears" value={skill.experienceYears} onChange={(e) => handleSkillChange(e, index)} label="Experience Years">
                    <MenuItem value="">Experience Years</MenuItem>
                    {Array.from({ length: 10 }, (_, i) => (<MenuItem key={i} value={i.toString()}>{i}</MenuItem>))}
                    <MenuItem value="10+">10+</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ width: 120 }}>
                  <InputLabel>Last Time Used Skill</InputLabel>
                  <Select labelId="last-time-used-skill-label" name="lastTimeUsed" value={skill.lastTimeUsed} onChange={(e) => handleSkillChange(e, index)} label="Last Time Used Skill">
                      <MenuItem value="">Last Time Used:</MenuItem>
                      {Array.from({ length: 10 }, (_, i) => (
                      <MenuItem key={i} value={(2023 - i).toString()}>{2023 - i}</MenuItem>))}
                  </Select>
                 </FormControl>
                 <DeleteIcon onClick={() => deleteSkill(index)} className="delete-icon"/>
              </div>
            )}
            <button className="btn add-skill-btn" onClick={onAddSkill}>Add Skill</button>
            <button className="btn save-btn" onClick={onUpdateMentor}>Save Changes</button>


        </div>
        :
        <div className="my-account user-account">
          <img src={UpdatedUserPicture || user.picture || DEFAULT_USER_PICTURE} />
          <h2 className="name">{user.firstName} {user.lastName}</h2>
          <h4 className="email">{user.email}</h4>
          <button className="btn choose-picture-btn" onClick={handleClickOnChoosePhoto}>Choose Photo</button>
          <button className="btn delete-btn" onClick={handleDelete}>Delete Account</button>
          <input type="file" name='file' ref={hiddenFileInput} style={{ display: 'none' }} onChange={fileSelectHandler} />
        </div>
      }
    </div>
  );
};

export default MyAccount;
