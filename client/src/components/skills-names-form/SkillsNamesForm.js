import './skills-names-form.css'
import {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SkillsSearchForm from './SkillsSearchForm';
import {suggested_skills} from '../../skills-dataset'

const SkillsNamesForm = ({ skillsNames, onAddSkillName, onDeleteSkill}) => {
    const [suggestedSkills, setSuggestedSkills] = useState(suggested_skills)

    const deleteSkillFromSuggestedSkills = (skill) => {
        const newSuggestedSkills = [...suggestedSkills]
        const skillIndex = newSuggestedSkills.findIndex(searchedSkill => searchedSkill === skill)
        newSuggestedSkills.splice(skillIndex, 1)
        setSuggestedSkills(newSuggestedSkills)
    }

    const onAddSuggestedSkill = (skill) => {
        deleteSkillFromSuggestedSkills(skill)
        onAddSkillName(skill)
    }

    return (
        <div id="skills-names-form-container">

            <div className="added-skills">
                <div className="title">Added Skills</div>
                {skillsNames.map((skill, index) => 
                    <div key={skill} className="added-skill">
                        <p>{skill}</p>
                        <div onClick={() => onDeleteSkill(index)} className="delete-icon-container">
                            <CloseIcon className="delete-icon"/>
                        </div>
                    </div>
                )}
            </div>

            <div className="skills-search-form-container">
                <SkillsSearchForm onAddSkillName={onAddSkillName}/>
            </div>
            

            <div className="suggested-skills">
                <div className="title">Suggested Skills</div>
                {suggestedSkills.map(skill => 
                    <div key={skill} className="suggested-skill" onClick={() => onAddSuggestedSkill(skill)}>
                        <p>{skill}</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default SkillsNamesForm