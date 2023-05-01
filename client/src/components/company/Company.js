import "./company.css";
import { useState, useEffect } from "react";
import {
  fetchCompanyPendingUsers,
  fetchCompanyUsers,
  fetchCompanyMentors,
  fetchFutureMeetings,
} from "../../CompanyApi";
import { approveUser } from "../../MentorsApi";
import BiChart from "../charts/BiChart";
import ColumnChart from "../charts/ColumnChart";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { DEFAULT_USER_PICTURE } from "../../Constants";
import Table from "../table/Table";
import AdminDashboard from "./Dashboard";
import Card from "../templates/Card";
import MentorsTable from "../table/MentorTable"
import MenteesTable from "../table/MenteeTable"
import PendingTable from '../table/PendingTable'
import { useNavigate } from "react-router-dom";


const Company = ({ company, onLogout }) => {
  const [companyUsers, setCompanyUsers] = useState([]);
  const [companyPendingUsers, setCompanyPendingUsers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [companyMentors, setCompanyMentors] = useState([]);
  const [numOfMentors, setNumOfMentors] = useState(0);
  const [numOfUsers, setNumOfUsers] = useState(0);
  const [numOfPendign, setNumOfPendign] = useState(0);
  const [skillsCount, setSkillsCount] = useState({});
  const [futureMeetings, setFutureMeetings] = useState(null);
  const [activeBtn, setActiveBtn] = useState(0);

  const naviage = useNavigate();
  useEffect(() => {
    console.log(company);
    if (company) {
      const getCompanyUsers = async () => {
        const fetchedCompanyUsers = await fetchCompanyUsers(company._id);
        setCompanyUsers(fetchedCompanyUsers);
        const fetchedMentees = fetchedCompanyUsers.filter(
          (user) => !user.isMentor
        );
        const fetchedMentors = fetchedCompanyUsers.filter(
          (user) => user.isMentor
        );
        setNumOfMentors(fetchedMentors.length);
        setNumOfUsers(fetchedMentees.length);
        setMentees(fetchedMentees);
        setMentors(fetchedMentors);
      };
      getCompanyUsers();

      const getCompanyPendingUsers = async () => {
        const fetchedCompanyFetchedUsers = await fetchCompanyPendingUsers(
          company._id
        );
        setCompanyPendingUsers(fetchedCompanyFetchedUsers);
        setNumOfPendign(fetchedCompanyFetchedUsers.length);
      };
      getCompanyPendingUsers();

      const getFutureMeetings = async () => {
        const fetchedMeetings = await fetchFutureMeetings(company._id);
        console.log(fetchedMeetings);
        setFutureMeetings(fetchedMeetings);
      };
      getFutureMeetings();

      const getCompanyMentors = async () => {
        const fetchedCompanyMentors = await fetchCompanyMentors(company._id);
        mapSkills(fetchedCompanyMentors);
        setCompanyMentors(fetchedCompanyMentors);
      };
      getCompanyMentors();
    }
  }, []);

  const mapSkills = (companyMentors) => {
    let arraySkills = [];
    let countSkills = {};
    companyMentors.forEach((mentor) => {
      arraySkills.push(...mentor.skills);
    });
    arraySkills.forEach((skill) => {
      countSkills[skill.name] = countSkills[skill.name]
        ? countSkills[skill.name] + 1
        : 1;
    });
    setSkillsCount(countSkills);
  };

  const onApproveUser = async (userId, index) => {
    await approveUser(userId);
    const newPendingUsers = [...companyPendingUsers];
    newPendingUsers.splice(index, 1);
    setCompanyPendingUsers(newPendingUsers);
  };
  const onRejectUser = async (userId, index) => {
    //await rejectUser(userId)
    const newPendingUsers = [...companyPendingUsers];
    newPendingUsers.splice(index, 1);
    setCompanyPendingUsers(newPendingUsers);
  };

  return (
    <div id="company-container">
      <div className="sidebar-placeholder">
        <div className="sidebar-container">
          <div className="company-details">
            <img src={company.logoUrl || DEFAULT_USER_PICTURE} />
            <p className="name">{company.name}</p>
          </div>
        
          <div className="routes">
            <button
              onClick={() => window.location.href="#header-section"}
              className={`route ${activeBtn === 0 && "route-active"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => window.location.href="#statistic-section"}
              className={`route ${activeBtn === 3 && "route-active"}`}
            >
              Data & Statistics
            </button>
            <button
              onClick={() => window.location.href="#meetings-section"}
              className={`route ${activeBtn === 3 && "route-active"}`}
            >
              Meetings
            </button>
            <button
              onClick={() => window.location.href="#users-section"}
              className={`route ${activeBtn === 1 && "route-active"}`}
            >
              Mentees & Mentors
            </button>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
          <div className="footer">&#174;BookAMentor</div>
        </div>
      </div>

      <div className="company-page-container">
        <div
          className="app-logo-container"
          onClick={() => (window.location.href = "/")}
        >
          <img
            className="app-icon"
            src="https://icons.iconarchive.com/icons/fa-team/fontawesome/256/FontAwesome-Laptop-Code-icon.png"
          />
          <h2>Book A Mentor</h2>
        </div>

        {activeBtn === 0 && (
            <>
            <div className="dashboard-container">
            <div className="status-container" id="header-section">
            {futureMeetings && <Card numOfUsers={numOfUsers} numOfPendign={numOfPendign} numOfMentors={numOfMentors} futureMeetings={futureMeetings} /> }
            </div>


            <div className="stats-container" id="statistic-section">
            {skillsCount && <ColumnChart mapskills={skillsCount} />}
            {numOfMentors && numOfUsers && numOfPendign && ( <BiChart mentors={numOfMentors} users={numOfUsers} pending={numOfPendign} /> )}
            </div>


          <div className="Tabels">
          <div className="users-container">
                      <div className="section-two" id="meetings-section">
                        <div className="approve-pending-users-container">
                            <h3>Approve Pending Users:</h3>
                            <div className="list">
                                {companyPendingUsers && companyPendingUsers.length != 0 && <PendingTable companyPendingUsers={companyPendingUsers}
                                    onApproveUser={onApproveUser} onRejectUser={onRejectUser} />}
                            </div>
                        </div>
                
                        <div className="meetings-container">
                          <h3 className="title">
                            {futureMeetings && futureMeetings.length != 0
                              ? "Upcoming Meetings:"
                              : "There is no upcoming meetings"}
                          </h3>
                          <div className="list">
                          {futureMeetings && futureMeetings.length != 0 && (
                            <Table data={futureMeetings} />
                          )}
                          </div>
                        </div>
                        </div>


                        <div className="users-containerr" id="users-section">
                        <div className="mentors-container">
                            <h3>Our Mentors:</h3>
                            <div className="list">
                                {mentors && mentors.length != 0 && <MentorsTable mentors={mentors} />}
                            </div>
                        </div>

                        <div className="mentees-container">
                            <h3>Our Mentees:</h3>
                            <div className="list">
                                {mentees && mentees.length != 0 && <MenteesTable mentees={mentees} />}
                            </div>
                        </div>
                        </div>
                    </div>
            
              </div>
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Company;
