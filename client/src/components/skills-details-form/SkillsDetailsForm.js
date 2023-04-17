import './skills-details-form.css'
import SkillDetailsForm from './SkillDetailsForm'

const SkillsDetailsForm = ({skillsNames, onSkillChange}) => {
    return (
        <div id="skills-details-form-container">
            {skillsNames.map((skillName) =>
                <SkillDetailsForm skillName={skillName} onSkillChange={onSkillChange}/>
                )
            }
        </div>
    )
}

export default SkillsDetailsForm