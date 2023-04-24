import "./my-account.css";
import { deleteUserById } from "../../MentorsApi";
import { DEFAULT_USER_PICTURE } from '../../Constants'
import { useState, useRef } from "react";
import axios from "axios"

const MyAccount = ({ user, onDelete, setUpdatedUserPicture, UpdatedUserPicture }) => {
  const hiddenFileInput = useRef(null);
  const handleDelete = async () => {
    await deleteUserById(user._id);
    onDelete();
  }

  const fileSelectHandler = event => {
    event.preventDefault()
    let  preview = URL.createObjectURL(event.target.files[0]);
    let  data = event.target.files[0];
    let imageType = data.name.split(".")[1];
    if (imageType != "png" && imageType != "jpg" && imageType != "jpeg") {
      alert('Only .png, .jpg and .jpeg format allowed!');
      return;
    }
    setUpdatedUserPicture(preview);
    const formData = new FormData();
    formData.append('profileImg', data)
    axios.put(`/images/${user._id}`, formData, {
    }).then(res => {
      console.log(res)
    })
  }

  const handleClickOnChoosePhoto = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div id="my-account-container">
      {user &&
        <div id="my-account">
          <img src={UpdatedUserPicture || user.picture || DEFAULT_USER_PICTURE} />
          <h2 className="name">{user.firstName} {user.lastName}</h2>
          <h4 className="email">{user.email}</h4>
          <button className="btn choose-picture-btn" onClick={handleClickOnChoosePhoto}>Choose Photo</button>
          <button className="btn delete-btn" onClick={handleDelete}>Delete Account</button>
          <input type="file" name='file' ref={hiddenFileInput} style={{ display: 'none' }} onChange={fileSelectHandler} />
        </div>
      }
    </div>
  );
};

export default MyAccount;
