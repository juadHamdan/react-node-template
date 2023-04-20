import "./profile.css";
import { deleteUserById } from "../../MentorsApi";

const Profile = ({ user, onDelete }) => {
  let userId = user._id;

  const handleDelete = async () => {
    await deleteUserById(user._id);
    onDelete();
  };
  return (
    <div id="profile-container">
      <div id="profile">
        <img
          src={
            user.picture
              ? user.picture
              : "https://www.citypng.com/public/uploads/small/116395943260tji5ordfujy44njydzhlidv8reqpmtun7ggx1oszpz1dcistzxnmag7do6vxkjxphlsgueuurkg9pkpbwgorvv9lratpxm38rp5.png"
          }
        ></img>
        <h2 className="name">
          {user.firstName} {user.lastName}
        </h2>
        <h4 className="email">{user.email}</h4>
        <button className="delete-btn" onClick={handleDelete}>
          Delete Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
