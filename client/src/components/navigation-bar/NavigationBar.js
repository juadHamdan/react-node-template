import "./navigation-bar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../sign-up/SignUp";
import Profile from "../profile/Profile";
import Modal from "../modal/Modal";
import { googleLogout } from "@react-oauth/google";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { MENTOR_FORM_ROUTE, COMPENY_MENTORSHIP_ROUTE } from "../../Constants";
import { useNavigate } from "react-router-dom";

const ROUTES = [MENTOR_FORM_ROUTE, COMPENY_MENTORSHIP_ROUTE];
const userMenuItems = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = ({ user, onLogout, onAuthorization }) => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  function handleUserMenuClick(settingName) {
    switch (settingName) {
      case "Logout":
        googleLogout();
        onLogout();
        break;
      case "Profile":
        if (!user.isMentor) {
          onProfileClick();
        } else {
          navigate(`/mentor-profile/${user._id}`); //user is mentor
          console.log(user._id);
        }
        break;
    }
  }

  const handleToggleNavMenu = () =>
    setShowNavMenu((showNavMenu) => !showNavMenu);
  const handleToggleUserMenu = () =>
    setShowUserMenu((showUserMenu) => !showUserMenu);

  const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);
  const getRouteDisplayName = (route) =>
    route
      .slice(1)
      .split("-")
      .map((word) => capitalizeWord(word))
      .join(" ");

  const onLoginClick = () => setShowSignUpModal(true);
  const onCloseLoginModal = () => setShowSignUpModal(false);

  const onProfileClick = () => setShowProfileModal(true);
  const onCloseProfileModal = () => setShowProfileModal(false);

  return (
    <div id="navigation-bar-container">
      <div id="navigation-bar">
        <Modal show={showSignUpModal} onClose={onCloseLoginModal}>
          <SignUp
            onSubmitClick={() => setShowSignUpModal(false)}
            onAuthorization={onAuthorization}
          />
        </Modal>
        <Modal show={showProfileModal} onClose={onCloseProfileModal}>
          <Profile user={user} onDelete={onLogout} />
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
                {ROUTES.map((route) => (
                  <Link
                    onClick={() => setShowNavMenu(false)}
                    className="menu-item"
                    to={route}
                  >
                    {getRouteDisplayName(route)}
                  </Link>
                ))}
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
            <h3>Hook A Mentor</h3>
          </div>

          <div className="routes">
            <Link className="route" to="/">
              <button className="btn">Home</button>
            </Link>
            {ROUTES.map((route) => (
              <Link className="route" to={route}>
                <button className="btn">{getRouteDisplayName(route)}</button>
              </Link>
            ))}
          </div>

          <div>
            {user ? (
              <div className="menu">
                <Tooltip title="Open User Menu">
                  <IconButton onClick={handleToggleUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Picture" src={user.picture} />
                  </IconButton>
                </Tooltip>

                {showUserMenu && (
                  <div className="menu-items user-menu-items">
                    {userMenuItems.map((userMenuItem) => (
                      <div
                        key={userMenuItem}
                        className="menu-item"
                        onClick={() => handleUserMenuClick(userMenuItem)}
                      >
                        {userMenuItem}
                      </div>
                    ))}
                  </div>
                )}
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
