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
import MentorPage from "./components/mentors/mentor-page/MentorPage";
import MentorForm from "./components/mentor-form/MentorForm";
import AlertShouldLogin from "./components/alerts/AlertShouldLogin";
import { googleLogout } from "@react-oauth/google";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    sessionStorage.getItem("token")
      ? JSON.parse(sessionStorage.getItem("token"))
      : null
  );

  useEffect(() => {
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
          <Route path="mentors/:mentorID" element={<MentorPage user={user} />}/>
          <Route path="/mentor-form" element={user ? <MentorForm user={user} /> : <AlertShouldLogin />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

//        {user && <MyScheduler user={user} />}
