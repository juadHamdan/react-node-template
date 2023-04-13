import './navigation-bar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import SignUp from '../sign-up/SignUp'
import Profile from '../profile/Profile'
import Modal from '../modal/Modal';
import { googleLogout, useGoogleOneTapLogin } from '@react-oauth/google'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ROUTES } from '../../Constants'

const userMenuItems = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavBar = ({
    user,
    onLogout,
    onAuthorization
}) => {
    const [showNavMenu, setShowNavMenu] = useState(null);
    const [showUserMenu, setShowUserMenu] = useState(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    function handleUserMenuClick(settingName) {
        switch (settingName) {
            case "Logout":
                googleLogout()
                onLogout()
                break;
            case "Profile":
                onProfileClick()
                break;
        }
    }

    const handleOpenNavMenu = (event) => setShowNavMenu(event.currentTarget)
    const handleOpenUserMenu = (event) => setShowUserMenu(event.currentTarget)

    const handleCloseNavMenu = () => setShowNavMenu(null);
    const handleCloseUserMenu = (menuItem) => {
        handleUserMenuClick(menuItem)
        setShowUserMenu(null);
    }

    function capitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    function getRouteDisplayName(route) {
        return route.slice(1).split('-').map(word => capitalizeWord(word)).join(' ')
    }

    const onLoginClick = () => setShowSignUpModal(true)
    const onCloseLoginModal = () => setShowSignUpModal(false)

    const onProfileClick = () => setShowProfileModal(true)
    const onCloseProfileModal = () => setShowProfileModal(false)

    return (
        <div id="navigation-bar">
            <Modal show={showSignUpModal} onClose={onCloseLoginModal}>
                <SignUp onSubmitClick={() => setShowSignUpModal(false)} onAuthorization={onAuthorization}/>
            </Modal>
            <Modal show={showProfileModal} onClose={onCloseProfileModal}>
                <Profile user={user} />
            </Modal>

            <AppBar position="static">
                <Container maxWidth="xl" sx={{ backgroundColor: "var(--navigation-bar-background-color)" }}>
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Rent2Save
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={showNavMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(showNavMenu)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {ROUTES.map(route => (
                                    <MenuItem key={route} onClick={handleCloseNavMenu}>
                                        <Link style={{ textDecoration: "none" }} to={route}>
                                            <Typography textAlign="center" fontWeight="bold">{getRouteDisplayName(route)}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Rent2Save
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {ROUTES.map(route => (
                                <Link key={route} to={route} onClick={handleCloseNavMenu} style={{ textDecoration: "none" }}>
                                    <Button
                                        sx={{ my: 2, color: 'white', display: 'block', fontWeight: "bold" }}
                                    >
                                        {getRouteDisplayName(route)}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {user ?
                                <>
                                    <Tooltip title="Open User Menu">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="User Picture" src={user.picture} />
                                        </IconButton>

                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={showUserMenu}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(showUserMenu)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {userMenuItems.map(userMenuItem => (
                                            <MenuItem key={userMenuItem} onClick={() => handleCloseUserMenu(userMenuItem)}>
                                                <Typography textAlign="center">{userMenuItem}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                                :
                                    <Button onClick={onLoginClick} color="inherit" sx={{ fontWeight: "bold" }}>Login</Button>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default NavBar;