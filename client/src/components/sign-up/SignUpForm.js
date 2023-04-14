
import { useState } from 'react';
import './sign-up.css'
import TextField from '@mui/material/TextField';
import EmailIcon from './icons/email.svg'

const SignUpForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

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
                <div className="row">
                    <TextField required name="firstName" value={formData.firstName} id="outlined-basic" label="First Name" variant="outlined" onChange={handleChange} />
                    <TextField required name="lastName" value={formData.lastName} id="outlined-basic" label="Last Name" variant="outlined" onChange={handleChange} />
                </div>

                <TextField required name="email" value={formData.email} id="outlined-basic" label="Email" variant="outlined" onChange={handleChange} />
                <TextField required name="password" value={formData.password} type="password" id="outlined-basic" label="Password" variant="outlined" onChange={handleChange} />

                <button type="submit" className="email-btn">
                    <img className="logo" src={EmailIcon} />
                    <p>Sign Up</p>
                </button>
            </form>
        </div>
    )
}

export default SignUpForm