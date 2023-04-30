import "./navigation-bar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../sign-up/SignUp";
import MyAccount from "../my-account/MyAccount";
import Modal from "../modal/Modal";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import MyScheduler from '../schedules/MyScheduler'
import { toast } from "react-toastify";
import { DEFAULT_USER_PICTURE } from '../../Constants'

const NavBar = ({ user, onLogout, onAuthorization }) => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showMyAccountModal, setShowMyAccountModal] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false)
  const [UpdatedUserPicture, setUpdatedUserPicture] = useState(null);

  const navigate = useNavigate();

  const navigateToMentorProfile = () => {
    navigate(`/mentor-profile/${user._id}`)
    setShowUserMenu(false)
  }
  const navigateToMentorPage = () => {
    navigate(`/mentors/${user._id}`)
    setShowUserMenu(false)
  }
  const onOpenMyAccount = () => {
    setShowMyAccountModal(true)
    setShowUserMenu(false)
  }

  const handleToggleNavMenu = () => setShowNavMenu((showNavMenu) => !showNavMenu);
  const handleToggleUserMenu = () => setShowUserMenu((showUserMenu) => !showUserMenu);



  const onCloseSchedulerModal = () => setShowScheduler(false)
  const onOpenSchedulerModal = () => user ? setShowScheduler(true) : toast("Please Log In First.")

  const onLoginClick = () => setShowSignUpModal(true);
  const onCloseLoginModal = () => setShowSignUpModal(false);

  const onProfileClick = () => setShowMyAccountModal(true);
  const onCloseMyAccountModal = () => setShowMyAccountModal(false);

  return (
    <div id="navigation-bar-container">
      <div id="navigation-bar">
        <Modal show={showSignUpModal} onClose={onCloseLoginModal}>
          <SignUp
            onSubmitClick={() => setShowSignUpModal(false)}
            onAuthorization={onAuthorization}
          />
        </Modal>
        <Modal show={showMyAccountModal} onClose={onCloseMyAccountModal}>
          <MyAccount user={user} onDelete={onLogout} setUpdatedUserPicture={setUpdatedUserPicture} UpdatedUserPicture={UpdatedUserPicture} />
        </Modal>
        <Modal show={showScheduler} onClose={onCloseSchedulerModal}>
          {user && <MyScheduler user={user} />}
        </Modal>

        <div className="navigation-bar">
          <div className="menu nav-menu">
            <IconButton className="" size="large" onClick={handleToggleNavMenu}>
              <MenuIcon />
            </IconButton>
            {showNavMenu && (
              <div className="menu-items nav-menu-items">
                <Link
                  onClick={() => setShowNavMenu(false)}
                  className="menu-item"
                  to="/"
                >
                  Home
                </Link>
                {!user?.isMentor &&
                  <Link
                    onClick={() => setShowNavMenu(false)}
                    className="menu-item"
                    to="/mentor-form"
                  >
                    Become A Mentor
                  </Link>
                }
                <a className="menu-item" onClick={onOpenSchedulerModal}>
                  My Schedule
                </a>


              </div>
            )}
          </div>

          <div
            className="app-logo-container"
            onClick={() => (window.location.href = "/")}
          >
            <img
              className="app-icon"
              src="https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Laptop-Code-icon.png"
            />
            <h3>Book A Mentor</h3>
          </div>




          <div className="routes">
            <Link
              onClick={() => setShowNavMenu(false)}
              to="/"
            >
              <button className="btn">Home</button>
            </Link>
            {!user?.isMentor && user?.isPending === false &&
              <Link
                onClick={() => setShowNavMenu(false)}
                to="/mentor-form"
              >
                <button className="btn">Become A Mentor</button>
              </Link>
            }

            {user?.isPending === false && <button className="btn" onClick={onOpenSchedulerModal}>
              My Schedule
            </button>}
          </div>




          <div>
            {user ? (
              <div className="menu">
                <Tooltip title="Open User Menu">
                  <IconButton onClick={handleToggleUserMenu} sx={{ p: 0 }}>
                    <img className="profile-picture" src={UpdatedUserPicture || user.picture || DEFAULT_USER_PICTURE} alt="User Picture" />
                  </IconButton>
                </Tooltip>

                {showUserMenu &&
                  <div className="menu-items user-menu-items">
                    <div className="menu-item" onClick={onOpenMyAccount}>My Account</div>
                    <div className="menu-item" onClick={onLogout}>Logout</div>
                  </div>
                }
              </div>
            ) : (
              <button onClick={onLoginClick} className="btn login-btn">
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
