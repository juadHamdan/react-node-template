import './skills-search-form.css'
import {useState} from 'react'
import {skills} from '../../skills-dataset'
import TextField from '@mui/material/TextField';

const SkillsSearchForm = ({onAddSkillName}) => {
    const [skillNameInput, setSkillNameInput] = useState("")
    const [searchedSkills, setSearchedSkills] = useState([])

    const deleteSkillFromSearchedSkills = (skill) => {
        const newSearchedSkills = [...searchedSkills]
        const skillIndex = newSearchedSkills.findIndex(searchedSkill => searchedSkill === skill)
        newSearchedSkills.splice(skillIndex, 1)
        console.log(newSearchedSkills)
        setSearchedSkills(newSearchedSkills)
    }

    const handleAddSkill = (skill) => {
        deleteSkillFromSearchedSkills(skill)
        onAddSkillName(skill)
    }

    const handleChange = (event) => {
        const input = event.target.value
        setSkillNameInput(input)
        if(input === '') setSearchedSkills([])
        else setSearchedSkills([input, ...skills.filter(skill => skill.toLowerCase().includes(input.toLowerCase()))])
    }

    return (
        <div id="skills-search-form-container">
            <div className="search-skills">
                <TextField value={skillNameInput} fullWidth className="input" id="outlined-basic" label="Type Skill" variant="outlined" onChange={handleChange} />
                {searchedSkills.length === 0 ? null :
                    <div className="menu">
                        {searchedSkills.map(skill =>
                            <div key={skill} className="menu-item" onClick={() => handleAddSkill(skill)}>
                                {skill}
                            </div>
                        )}
                    </div>
                }
            </div>


        </div>
    )
}

export default SkillsSearchForm