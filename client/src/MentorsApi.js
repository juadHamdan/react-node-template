import axios from 'axios'

async function fetchMentorById(id) {
    try {
        const response = await axios.get('/mentor/' + id)
        return response.data
    }
    catch (err) {
        console.log(err)
        return null
    }
}

async function postMentorById(id, mentor) {
    try {
        const response = await axios.post('/mentor/' + id, mentor);
        return response.data
    } catch (error) {
        console.error(error);
        return null
    }
}

async function fetchMentorsBySkill(skill) {
    try{
        const response = await axios.get('/mentors?skill=' + skill) 
        return response.data
    }
    catch(error){
        console.log(error);
        return null
    }
}

async function fetchMentors() {
    try{
        const response = await axios.get('/mentors')
        return response.data
    }
    catch(error){
        console.log(error)
        return null
    }
}

export { fetchMentorById, postMentorById, fetchMentorsBySkill, fetchMentors }