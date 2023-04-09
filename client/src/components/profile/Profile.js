import './profile.css'

const Profile = ({user, onDelete}) => {
  return (
    <div id="profile-container">
        <div id="profile">
            <img src={user.picture}></img>
            <hr/><hr/><hr/>
            <h2>{user.firstName} {user.lastName}</h2>
            <h4>{user.email}</h4>
            <button className="delete-btn" onClick={onDelete}>Delete Profile</button>
        </div>
    </div>
  )
}

export default Profile