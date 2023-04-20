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
import MentorForm from "./components/mentor-form/MentorForm";
import AlertShouldLogin from "./components/alerts/AlertShouldLogin";
import EditMentorPage from "./components/mentors/EditMentorPage";
import MySchedulerModal from "./components/schedules/MySchedulerModal";
import MentorScheduleModal from "./components/schedules/MentorScheduleModal";
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
    <div>
      <Router>
        <ToastContainer />
        <NavigationBar
          user={user}
          onLogout={onLogout}
          onAuthorization={onAuthorization}
        />

        <MySchedulerModal />
        <MentorScheduleModal />

        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="mentors/:mentorID" element={<MentorPage />} />
          <Route path="/mentor-profile/:userID" element={<EditMentorPage />} />
          <Route
            path={MENTOR_FORM_ROUTE}
            element={user ? <MentorForm user={user} /> : <AlertShouldLogin />}
          />
          <Route
            path={COMPENY_MENTORSHIP_ROUTE}
            element={<div>Company Mentorship (only users)</div>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
