import './mentor-form.css';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SkillsNamesForm from '../skills-names-form/SkillsNamesForm';
import { postMentorById } from '../../MentorsApi';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import SkillsDetailsForm from '../skills-details-form/SkillsDetailsForm';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ContactsIcon from '@mui/icons-material/Contacts';
import GavelIcon from '@mui/icons-material/Gavel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useNavigate } from 'react-router-dom';

const steps = ['Add Skills', 'Add Details', '-'];

const initSkill = { name: "", rating: 3, githubUrl: "", description: "" }

const MentorForm = ({ user }) => {
    const [mentorData, setMentorData] = useState({
        skills: [], workExperience: "", githubUrl: "", phoneNumber: "", linkedinUrl: ""
    });
    const [skills, setSkills] = useState([])
    const navigate = useNavigate()
    const getSkillsNames = () => skills.map(skill => skill.name)

    const onAddSkillName = (skillName) => {
        const newSkill = { ...initSkill, name: skillName }
        setSkills(skills => [...skills, newSkill])
        setMentorData(mentorData => { return { ...mentorData, skills: [...skills, newSkill] } })
    }

    const onDeleteSkill = (skillIndex) => {
        const newSkills = [...skills]
        newSkills.splice(skillIndex, 1)
        setSkills(newSkills)
    }

    const [step, setStep] = useState(0)
    const handlePrev = () => setStep(step => step - 1)
    const handleNext = () => setStep(step => step + 1)

    const handleChange = (event) => setMentorData({ ...mentorData, [event.target.name]: event.target.value })

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(skills.length === 0){
            toast("You Must Add At Least One Skill")
            setStep(0)
            return
        }
        const addedMentor = await postMentorById(user._id, mentorData)
        navigate(`/mentors/${addedMentor._id}`)
        console.log(addedMentor) // add alert
        navigate('/mentors/' + addedMentor._id)
    }

    const onSkillChange = (skill) => {
        const newSkills = [...skills]
        const skillIndex = newSkills.findIndex(newSkill => newSkill.name === skill.name)
        newSkills[skillIndex] = skill
        setSkills(newSkills)
        setMentorData(mentorData => { return { ...mentorData, skills: newSkills } })
    }

    return (
        <div id="mentor-form-container">
            <ToastContainer/>

            <Stack sx={{ width: '100%', marginBottom: '50px' }} spacing={4}>
                <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>

            <form onSubmit={handleSubmit}>
                {step === 0 && <SkillsNamesForm skillsNames={getSkillsNames()} onAddSkillName={onAddSkillName} onDeleteSkill={onDeleteSkill} />}
                {step === 1 && <SkillsDetailsForm skillsNames={getSkillsNames()} onSkillChange={onSkillChange} />}
                {step === 2 &&
                    <div className="inputs-container">
                        <h3>Share Your Proffessional Experience:</h3>
                        <div className="inputs">
                            <TextField required name="workExperience" value={mentorData.workExperience} id="outlined-basic" label="Work Experience (Company Name, years, ...)" variant="outlined" onChange={handleChange} />
                            <TextField required name="githubUrl" value={mentorData.githubUrl} id="outlined-basic" label="Github Link" variant="outlined" onChange={handleChange} />
                        </div>
                        <h3>Share Your Contact Info:</h3>
                        <div className="inputs">
                            <TextField required disabled name="email" value={user.email} id="outlined-basic" label="Email" variant="outlined" />
                            <TextField required name="phoneNumber" value={mentorData.phoneNumber} id="outlined-basic" label="Phone Number" variant="outlined" onChange={handleChange} />
                            <TextField required name="linkedinUrl" value={mentorData.linkedinUrl} id="outlined-basic" label="LinkedIn Profile" variant="outlined" onChange={handleChange} />
                        </div>
                    </div>}

                <div className="controllers">
                    <button disabled={step === 0} onClick={handlePrev}>Previous</button>
                    {step === 2 ? <button type="submit">Done</button> : <button type="button" onClick={handleNext}>Next</button>}
                </div>
            </form>
        </div>
    );
};

export default MentorForm;



const StepperDisabledColor = '#81d4fa'
const StepperActiveColor = '#1565c0'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: StepperActiveColor,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: StepperActiveColor,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : StepperDisabledColor,
        borderRadius: 1,
    },
}));



const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : StepperDisabledColor,
    zIndex: 1,
    color: 'white',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: StepperActiveColor,
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
        scale: '1.1',
    }),
    ...(ownerState.completed && {
        background: StepperActiveColor,
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <WorkspacePremiumIcon />,
        2: <ContactsIcon />,
        3: <GavelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}