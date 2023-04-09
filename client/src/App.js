import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from './components/navigation-bar/NavigationBar'
import { fetchUser, trySignOut } from './AuthApi'
import { RENTAL_ITEMS_ROUTE, RENTAL_ITEM_ROUTE, ADD_RENTAL_ITEM_ROUTE } from './Constants'

import RentalItems from './components/rental-items/RentalItems';
import {mockRentalItems} from './MockRentalItems';

function App() {
  const [user, setUser] = useState(null)
  const [rentalItems, setRentalItems] = useState(mockRentalItems)

  console.log(mockRentalItems)

  useEffect(() => {
    const tryGetUser = async () => setUser(await fetchUser())
    tryGetUser()
  }, [])

  function onSignOutClick() {
    if(trySignOut()){
      setUser(null)
      toast("Logged Out Successfully")
    }
    else toast("Log Out Failed.") 
  }

  const onItemClick = () => console.log("Item")
  const onLikeClick = () => console.log("Like")
  const onCartClick = () => console.log("Cart")
  const RentalItemsComponent = <RentalItems items={rentalItems} onItemClick={onItemClick} onLikeClick={onLikeClick} onCartClick={onCartClick}/>

  return (
    <div>
      <Router>
        <ToastContainer/>
        <NavigationBar user={user} onLogoutClick={onSignOutClick} />
        <Routes>
          <Route path="/" exact element={<Navigate to={RENTAL_ITEMS_ROUTE} />} />
          <Route path={RENTAL_ITEMS_ROUTE} element={RentalItemsComponent} />
          <Route path={ADD_RENTAL_ITEM_ROUTE} element={<div>Add Rental Item</div>} />
          <Route path={RENTAL_ITEM_ROUTE} element={<div>Rental Item</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
