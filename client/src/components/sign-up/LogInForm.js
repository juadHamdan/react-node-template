
import { useState } from 'react';
import './sign-up.css'
import TextField from '@mui/material/TextField';
import EmailIcon from './icons/email.svg'

const LogInForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(formData)
    }

    return (
        <div id="form-container">
            <form onSubmit={handleSubmit}>
                <TextField required name="email" value={formData.email} id="outlined-basic" label="Email" variant="outlined" onChange={handleChange} />
                <TextField required name="password" value={formData.password} type="password" id="outlined-basic" label="Password" variant="outlined" onChange={handleChange} />
                <button type="submit" className="email-btn">
                    <img className="logo" src={EmailIcon} />
                    <p>Continue With Email</p>
                </button>
            </form>
        </div>
    )
}

export default LogInForm