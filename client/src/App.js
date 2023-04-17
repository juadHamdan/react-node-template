import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./components/landing/Landing";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import { fetchUser } from "./AuthApi";
import { MENTOR_FORM_ROUTE, COMPENY_MENTORSHIP_ROUTE } from "./Constants";
import MentorPage from "./components/mentors/MentorPage";
import MentorForm from "./components/mentor-form/MentorForm"
import AlertShouldLogin from "./components/alerts/AlertShouldLogin";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null
  );

  useEffect(() => {
    console.log("Here");
    if (token) {
      const tryGetUser = async () => await login(token);
      tryGetUser();
    }
  }, []);

  const onAuthorization = async (token) => {
    setToken(token);
    sessionStorage.setItem("token", JSON.stringify(token));
    login(token);
    toast("Logged In Successfully");
  };

  const login = async (token) => {
    const fetchedUser = await fetchUser(token);
    setUser(fetchedUser);
  };

  const onLogout = () => {
    setUser(null);
    sessionStorage.clear();
    toast("Logged Out Successfully");
  };

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
          <Route path="/" exact element={<Landing />} />
          <Route path="mentors/:mentorID" element={<MentorPage />}></Route>
          <Route path={MENTOR_FORM_ROUTE} element={user ? <MentorForm user={user}/> : <AlertShouldLogin />}/>
          <Route path={COMPENY_MENTORSHIP_ROUTE} element={<div>Company Mentorship (only users)</div>}/>
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
