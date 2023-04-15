import './skills.css'
import { useState } from 'react';
import {skills} from '../../skills'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';

const Skills = ({ }) => {
    const [skillNameInput, setSkillNameInput] = useState("");
    const [searchedSkills, setSearchedSkills] = useState([]);
    const [addedSkills, setAddedSkills] = useState([])


    const handleChange = (event) => {
        const input = event.target.value
        setSkillNameInput(input)
        setSearchedSkills(skills.filter(skill => skill.name.toLowerCase().includes(input.toLowerCase())))
    }

    const onAddSkill = (skill) => {
        const newSearchedSkills = [...searchedSkills]
        const skillIndex = newSearchedSkills.findIndex(searchedSkill => searchedSkill.name === skill.name)
        newSearchedSkills.splice(skillIndex, 1)
        console.log(newSearchedSkills)
        setSearchedSkills(newSearchedSkills)

        setAddedSkills(addedSkills => [...addedSkills, skill])

    }

    const onDeleteSkill = (skill) => {
        const newAddedSkills = [...addedSkills]
        const skillIndex = newAddedSkills.findIndex(addedSkill => addedSkill.name === skill.name)
        newAddedSkills.splice(skillIndex, 1)
        setAddedSkills(newAddedSkills)

        setSearchedSkills(skillsToShow => [...skillsToShow, skill])
    }

    const onSearchClick = (event) => {
        if(event.target.value === "") setSearchedSkills(skills)
    }

    return (
        <div id="skills-container">

            <div className="added-skills">
                <div className="title">Add Skills</div>
                {addedSkills.map(skill => 
                    <div key={skill.name} className="added-skill">
                        <p>{skill.name}</p>
                        <div onClick={() => onDeleteSkill(skill)} className="delete-icon-container">
                            <CloseIcon className="delete-icon"/>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="search-skills">
                <TextField onClick={onSearchClick} value={skillNameInput} fullWidth id="outlined-basic" label="Type Skill" variant="outlined" onChange={handleChange} />
                {searchedSkills.length === 0 ? null : 
                    <div className="menu">
                        {searchedSkills.map(skill => 
                            <div key={skill.name} className="menu-item" onClick={() => onAddSkill(skill)}>
                                {skill.name}
                            </div>
                        )}
                    </div>
                }
            </div>


        </div>
    )
}

export default Skills