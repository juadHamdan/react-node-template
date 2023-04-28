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
import { fetchUser, fetchCompany } from "./AuthApi";
import MentorPage from "./components/mentors/mentor-page/MentorPage";
import MentorForm from "./components/mentor-form/MentorForm";
import AlertShouldLogin from "./components/alerts/AlertShouldLogin";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [isCompany, setIsCompany] = useState(sessionStorage.getItem("isCompany") ? JSON.parse(sessionStorage.getItem("isCompany")): false)
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")): null);

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
      const fetchCompany = await fetchCompany(token)
      setCompany(fetchCompany);
      navigate('/company-landing')
    }
    else{
      const fetchedUser = await fetchUser(token)
      setUser(fetchedUser);
      if(fetchedUser.companyId) navigate('/user-landing')
      else navigate('/pending-user')
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
      <Router>
        <ToastContainer />
        <NavigationBar
          user={user}
          onLogout={onLogout}
          onAuthorization={onAuthorization}
        />

        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/user-landing" exact element={<div>User Landing</div>} />
          <Route path="/company-landing" element={<div>Company Page</div>}/>
          <Route path="/pending-user" element={<div>Please Choose Company Name</div>}/>
          <Route path="mentors/:mentorID" element={<MentorPage user={user} />}/>
          <Route path="/mentor-form" element={user ? <MentorForm user={user} /> : <AlertShouldLogin />}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;

//        {user && <MyScheduler user={user} />}
