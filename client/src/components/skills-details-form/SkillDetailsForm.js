import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const SkillDetailsForm = ({ skillName, onSkillChange }) => {
    const [skillData, setSkillData] = useState({ name: skillName, rating: 3, githubUrl: "", description: "" })
    
    const handleChange = (event) => {
        const newSkillData = { ...skillData, [event.target.name]: event.target.value }
        setSkillData(newSkillData)
        onSkillChange(newSkillData)
    }

    return (
        <div id="skill-detail-form">
            <h3>{skillName}</h3>
            <div>
                <Typography component="legend">Knowledge</Typography>
                <Rating
                    name="rating"
                    value={skillData.rating}
                    onChange={handleChange}
                />
            </div>
            <TextField name="githubUrl" value={skillData.githubUrl} id="outlined-basic" label="Github Link" variant="outlined" onChange={handleChange} />
            <TextField name="description" value={skillData.description} id="outlined-basic" label="Elaborate..." variant="outlined" onChange={handleChange} />
        </div>
    )
}

export default SkillDetailsForm