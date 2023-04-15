import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Landing from './components/landing/Landing'
import NavigationBar from './components/navigation-bar/NavigationBar'
import { fetchUser } from './AuthApi'
import Skills from './components/skills/Skills'
import { MENTOR_FORM_ROUTE, COMPENY_MENTORSHIP_ROUTE } from './Constants'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null)

  useEffect(() => {
    console.log("Here")
    if (token) {
      const tryGetUser = async () => login(token)
      tryGetUser()
    }
  }, [])


  const onAuthorization = async (token) => {
    setToken(token)
    sessionStorage.setItem("token", JSON.stringify(token))
    login(token)
    toast("Logged In Successfully")
  }

  const login = async (token) => {
    const fetchedUser = await fetchUser(token)
    setUser(fetchedUser)
  }

  const onLogout = () => {
    setUser(null)
    sessionStorage.clear()
    toast("Logged Out Successfully")
  }


  return (
    <div>
      <Router>
        <ToastContainer />
        <NavigationBar
          user={user}
          onLogout={onLogout}
          onAuthorization={onAuthorization}
        />

        <Routes>
          <Route path="/" exact element={<Landing/>} />
          <Route path={MENTOR_FORM_ROUTE} exact element={<div>Mentor Form (only users)</div>} />
          <Route path={COMPENY_MENTORSHIP_ROUTE} exact element={<div>Company Mentorship (only users)</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;










/*
const [rentalItems, setRentalItems] = useState(mockRentalItems)
const [likedItemsIds, setLikedItemsIds] = useState([])
const [cartItemsIds, setCartItemsIds] = useState([])

function onSignOutClick() {
  if (trySignOut()) {
    setUser(null)
    toast("Logged Out Successfully")
  }
  else toast("Log Out Failed.")
}

const onItemClick = (id) => console.log("Item") //change to link !
const onLikeClick = (id, isLiked) => {
  if (isLiked) {
    setLikedItemsIds(likedItemsIds => [...likedItemsIds, id])
  }
  else {
    const newLikedItemsIds = [...likedItemsIds]
    const likedItemIdIndex = newLikedItemsIds.findIndex(likedItemsId => likedItemsId === id)
    newLikedItemsIds.splice(likedItemIdIndex, 1)
    setLikedItemsIds(newLikedItemsIds)
  }
}
const onCartClick = (id, isAddedToCart) => {
  if (isAddedToCart) {
    setCartItemsIds(cartItemsIds => [...cartItemsIds, id])
  }
  else {
    const newCartItemsIds = [...cartItemsIds]
    const cartItemIdIndex = newCartItemsIds.findIndex(cartItemsId => cartItemsId === id)
    newCartItemsIds.splice(cartItemIdIndex, 1)
    setCartItemsIds(newCartItemsIds)
  }
}
const RentalItemsComponent = <RentalItems items={rentalItems} onItemClick={onItemClick} onLikeClick={onLikeClick} onCartClick={onCartClick} />

/*
useEffect(() => {
  console.log("Here")
  const tryGetUser = async () => setUser(await fetchUser(accessToken))
  if(accessToken) tryGetUser()
}, [accessToken])
*/