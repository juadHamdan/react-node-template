import axios from 'axios'
import { useEffect, useState } from 'react';
import Mentor from './Mentor';

function Mentors() {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        axios.get('/mentors').then(response => { 
        setMentors(response.data)
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return (mentors.map(mentor => <Mentor mentor ={mentor}/>))
}

export default Mentors