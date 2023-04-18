import Mentor from './Mentor';

function Mentors({mentors}) {
    return (mentors.map(mentor => <Mentor mentor={mentor}/>))
}

export default Mentors