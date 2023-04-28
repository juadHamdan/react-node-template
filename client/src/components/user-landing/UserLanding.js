import './user-landing.css'
import MentorsLookup from '../user-landing/mentors-lookup/MentorsLookup';

const UserLanding = ({user}) => {
  return (
    <div>
        <MentorsLookup user={user}/>
    </div>
  )
}

export default UserLanding