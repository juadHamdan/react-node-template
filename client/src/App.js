import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./components/landing/Landing";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import { fetchUser, fetchCompany } from "./AuthApi";
import MentorPage from "./components/mentors/mentor-page/MentorPage";
import MentorForm from "./components/mentor-form/MentorForm";
import AlertShouldLogin from "./components/alerts/AlertShouldLogin";
import { googleLogout } from "@react-oauth/google";
import UserLanding from './components/user-landing/UserLanding'
import PendingPage from './components/pending-page/PendingPage'
import Company from './components/company/Company'

function App() {
  const [isCompany, setIsCompany] = useState(sessionStorage.getItem("isCompany") ? JSON.parse(sessionStorage.getItem("isCompany")): false)
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")): null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const tryGetUser = async () => await login(token, isCompany);
      tryGetUser();
    }
  }, []);

  const onAuthorization = async (token, isCompany) => {
    setToken(token);
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("isCompany", JSON.stringify(isCompany));
    login(token, isCompany);
    toast("Logged In Successfully");
  };

  const login = async (token, isCompany) => {
    if(isCompany) {
      const fetchedCompany = await fetchCompany(token)
      console.log(fetchedCompany)
      setCompany(fetchedCompany);
      setIsCompany(true)
      navigate('/company-landing')
    }
    else{
      const fetchedUser = await fetchUser(token)
      console.log(fetchedUser)
      setUser(fetchedUser);
      if(fetchedUser.isPending) navigate('/pending-user')
      else navigate('/user-landing')
    }

  };

  const onLogout = () => {
    googleLogout();
    setUser(null);
    sessionStorage.clear();
    toast("Logged Out Successfully");
    window.location.href = "/";
  };

  return (
    <div className="app-container">

        <ToastContainer />
        {!isCompany && 
        <NavigationBar
          user={user}
          onLogout={onLogout}
          onAuthorization={onAuthorization}
        />
        }

        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/user-landing" element={<UserLanding user={user}/>} />
          <Route path="/company-landing" element={company && <Company company={company} onLogout={onLogout}/>}/>
          <Route path="/pending-user" element={<PendingPage user={user}/>}/>
          <Route path="/mentors/:mentorID" element={<MentorPage user={user} />}/>
          <Route path="/mentor-form" element={user ? <MentorForm user={user} /> : <AlertShouldLogin />}/>


        </Routes>
    </div>
  );
}

export default App;

//        {user && <MyScheduler user={user} />}
