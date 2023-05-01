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
              onClick={() => setActiveBtn(0)}
              className={`route ${activeBtn === 0 && "route-active"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveBtn(1)}
              className={`route ${activeBtn === 1 && "route-active"}`}
            >
              Mentees & Mentors
            </button>
            <button
              onClick={() => setActiveBtn(2)}
              className={`route ${activeBtn === 3 && "route-active"}`}
            >
              Meetings
            </button>
            <button
              onClick={() => setActiveBtn(3)}
              className={`route ${activeBtn === 3 && "route-active"}`}
            >
              Data & Statistics
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
            <div className="status-container">
            {futureMeetings && <Card numOfUsers={numOfUsers} numOfPendign={numOfPendign} numOfMentors={numOfMentors} futureMeetings={futureMeetings} /> }
            </div>

            <div className="stats-container">
            {skillsCount && <ColumnChart mapskills={skillsCount} />}
            {numOfMentors && numOfUsers && numOfPendign && ( <BiChart mentors={numOfMentors} users={numOfUsers} pending={numOfPendign} /> )}
            </div>

          <div className="Tabels">
            <div className="approve-pending-users-container">
              <p className="sub-title">Approve Pending Users:</p>
              <div className="list">
                <div className="list-item list-header">
                  <p className="list-item-header">Action</p> |
                  <p className="list-item-header">Picture</p> |
                  <p className="list-item-header">Full Name</p> |
                  <p className="list-item-header">Email</p>
                </div>
                {companyPendingUsers &&
                  companyPendingUsers.map((pendingUser, index) => (
                    <div className="list-item">
                      <ThumbUpAltIcon
                        className="approve-icon"
                        onClick={() => onApproveUser(pendingUser._id, index)}
                      />
                      <ThumbDownAltIcon
                        className="reject-icon"
                        onClick={() => onRejectUser(pendingUser._id, index)}
                      />{" "}
                      |
                      <img src={pendingUser.picture} /> |
                      <p>
                        {pendingUser.firstName} {pendingUser.lastName}
                      </p>{" "}
                      |<p>{pendingUser.email}</p>
                    </div>
                  ))}
              </div>
            </div>


            <div className="mentees-container">
                <p className="sub-title">Our Mentees:</p>
                <div className="list">
                  <div className="list-item list-header">
                    <p className="list-item-header">Picture</p> |
                    <p className="list-item-header">Full Name</p> |
                    <p className="list-item-header">Email</p>
                  </div>
                  {mentees &&
                    mentees.map((mentee, index) => (
                      <div className="list-item">
                        <img src={mentee.picture} /> |
                        <p>
                          {mentee.firstName} {mentee.lastName}
                        </p>{" "}
                        |<p>{mentee.email}</p>
                      </div>
                    ))}
                </div>
              </div>


              <div className="mentors-container">
              <p className="sub-title">Our Mentors:</p>
              <div className="list">
                <div className="list-item list-header">
                  <p className="list-item-header">Page</p> |
                  <p className="list-item-header">Picture</p> |
                  <p className="list-item-header">Full Name</p> |
                  <p className="list-item-header">Email</p>
                </div>
                {mentors &&
                  mentors.map((mentor, index) => (
                    <div className="list-item">
                      <button className="mentor-page-btn">Mentor Page</button> |
                      <img src={mentor.picture} /> |
                      <p>
                        {mentor.firstName} {mentor.lastName}
                      </p>{" "}
                      |<p>{mentor.email}</p>
                    </div>
                  ))}
              </div>
            </div>
            
              </div>
          </>
        )}


        {activeBtn === 2 && (
          <div className="meetings-container">
            <p className="title">
              {futureMeetings.length != 0
                ? "Upcoming Meetings:"
                : "There is no upcoming meetings"}
            </p>
            {futureMeetings && futureMeetings.length != 0 && (
              <Table data={futureMeetings} />
            )}
          </div>
        )}

        {activeBtn === 3 && (
          <div className="stats-container">
            {numOfMentors && numOfUsers && numOfPendign && (
              <BiChart
                mentors={numOfMentors}
                users={numOfUsers}
                pending={numOfPendign}
              />
            )}
            {skillsCount && <ColumnChart mapskills={skillsCount} />}
          </div>
        )}

        {activeBtn === 1 && (
          <div className="users-container">
            <div className="approve-pending-users-container">
              <p className="sub-title">Approve Pending Users:</p>
              <div className="list">
                <div className="list-item list-header">
                  <p className="list-item-header">Action</p> |
                  <p className="list-item-header">Picture</p> |
                  <p className="list-item-header">Full Name</p> |
                  <p className="list-item-header">Email</p>
                </div>
                {companyPendingUsers &&
                  companyPendingUsers.map((pendingUser, index) => (
                    <div className="list-item">
                      <ThumbUpAltIcon
                        className="approve-icon"
                        onClick={() => onApproveUser(pendingUser._id, index)}
                      />
                      <ThumbDownAltIcon
                        className="reject-icon"
                        onClick={() => onRejectUser(pendingUser._id, index)}
                      />{" "}
                      |
                      <img src={pendingUser.picture} /> |
                      <p>
                        {pendingUser.firstName} {pendingUser.lastName}
                      </p>{" "}
                      |<p>{pendingUser.email}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mentors-container">
              <p className="sub-title">Our Mentors:</p>
              <div className="list">
                <div className="list-item list-header">
                  <p className="list-item-header">Page</p> |
                  <p className="list-item-header">Picture</p> |
                  <p className="list-item-header">Full Name</p> |
                  <p className="list-item-header">Email</p>
                </div>
                {mentors &&
                  mentors.map((mentor, index) => (
                    <div className="list-item">
                      <button className="mentor-page-btn">Mentor Page</button> |
                      <img src={mentor.picture} /> |
                      <p>
                        {mentor.firstName} {mentor.lastName}
                      </p>{" "}
                      |<p>{mentor.email}</p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="mentees-container">
              <p className="sub-title">Our Mentees:</p>
              <div className="list">
                <div className="list-item list-header">
                  <p className="list-item-header">Picture</p> |
                  <p className="list-item-header">Full Name</p> |
                  <p className="list-item-header">Email</p>
                </div>
                {mentees &&
                  mentees.map((mentee, index) => (
                    <div className="list-item">
                      <img src={mentee.picture} /> |
                      <p>
                        {mentee.firstName} {mentee.lastName}
                      </p>{" "}
                      |<p>{mentee.email}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Company;
