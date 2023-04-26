import { useState } from "react";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const SkillDetailsForm = ({ skillName, onSkillChange }) => {
  const [skillData, setSkillData] = useState({ name: skillName, rating: 3, experienceYears: "", lastTimeUsed: 2023 });

  const handleChange = (event) => {
    const newSkillData = { ...skillData, [event.target.name]: event.target.value };
    setSkillData(newSkillData);
    onSkillChange(newSkillData);
  };

  return (
    <div id="skill-detail-form">
      <h3>{skillName}</h3>
      <div>
        <Typography component="legend">Knowledge</Typography>
        <Rating name="rating" value={skillData.rating} onChange={handleChange} />
      </div>
      <FormControl variant="outlined" sx={{ width: 200 }}>
        <InputLabel>Experience Years</InputLabel>
        <Select labelId="experience-years-label" name="experienceYears" value={skillData.experienceYears} onChange={handleChange} label="Experience Years">
          <MenuItem value="">Select Experience Years</MenuItem>
          {Array.from({ length: 10 }, (_, i) => (<MenuItem key={i} value={i.toString()}>{i}</MenuItem>))}
          <MenuItem value="10+">10+</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ width: 200 }}>
        <InputLabel>Last Time Used Skill</InputLabel>
        <Select labelId="last-time-used-skill-label" name="lastTimeUsed" value={skillData.lastTimeUsed} onChange={handleChange} label="Last Time Used Skill">
          <MenuItem value="">Last Time Used:</MenuItem>
          {Array.from({ length: 10 }, (_, i) => (
            <MenuItem key={i} value={(2023 - i).toString()}>{2023 - i}</MenuItem>))}
        </Select>
      </FormControl>

    </div>
  );
};

export default SkillDetailsForm;
