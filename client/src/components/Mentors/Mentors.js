import Mentor from './Mentor';

function Mentors({mentors}) {
    return (mentors.map(mentor => <Mentor key={mentor._id} mentor={mentor}/>))
}

export default Mentors