import './skills-search-form.css'
import {useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {skills} from '../../skills-dataset'
import TextField from '@mui/material/TextField';

const SkillsSearchForm = ({onAddSkillName}) => {
    const [skillNameInput, setSkillNameInput] = useState("")
    const [searchedSkills, setSearchedSkills] = useState([])
    const [addedSkills, setAddedSkills] = useState([])

    const isSkillAlreadyAdded = (skill) => addedSkills.some(addedSkill => addedSkill.toLowerCase() === skill.toLowerCase())

    const handleAddSkill = (skill) => {
        if(isSkillAlreadyAdded(skill))
        {
            toast("Skill Already Exist")
            setSearchedSkills([])
            setSkillNameInput("")
        }
        else{
            setAddedSkills(addedSkills => [...addedSkills, skill])
            onAddSkillName(skill)
        }
        setSearchedSkills([])
        setSkillNameInput("")
    }

    const handleChange = (event) => {
        const input = event.target.value
        setSkillNameInput(input)
        if(input === '') setSearchedSkills([])
        else setSearchedSkills([input, ...skills.filter(skill => skill.toLowerCase().includes(input.toLowerCase()))])
    }

    return (
        <div id="skills-search-form-container">
            <ToastContainer/>
            <div className="search-skills">
                <TextField value={skillNameInput} fullWidth className="input" label="Type Skill" variant="outlined" onChange={handleChange} />
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