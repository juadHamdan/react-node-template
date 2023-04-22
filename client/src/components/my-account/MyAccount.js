import "./my-account.css";
import { deleteUserById } from "../../MentorsApi";
import {DEFAULT_USER_PICTURE} from '../../Constants'

const MyAccount = ({ user, onDelete }) => {

  const handleDelete = async () => {
    await deleteUserById(user._id);
    onDelete();
  }

  return (
    <div id="my-account-container">
      <div id="my-account">
        <img src={user.picture || DEFAULT_USER_PICTURE}/>
        <h2 className="name">{user.firstName} {user.lastName}</h2>
        <h4 className="email">{user.email}</h4>
        <button className="btn choose-picture-btn" onClick={handleDelete}>Choose Photo</button>
        <button className="btn delete-btn" onClick={handleDelete}>Delete Profile</button>
      </div>
    </div>
  );
};

export default MyAccount;
