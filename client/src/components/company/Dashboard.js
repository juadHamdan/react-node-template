import React from "react";
import Card from "../templates/Card";
import "./Dashboard.css";
import BiChart from "../charts/BiChart";
import ColumnChart from "../charts/ColumnChart";
function AdminDashboard({numOfUsers , numOfMentors , numOfPendign , skillsCount , futureMeetings , companyPendingUsers}) {

console.log(`Number of Users: ${numOfUsers}`);
console.log(`Number of Mentors: ${numOfMentors}`);
console.log(`Number of Pending Requests: ${numOfPendign}`);
console.log(`Number of Skills: ${skillsCount}`);
console.log(`Number of Future Meetings: ${futureMeetings}`);
console.log(`Number of Company Pending Users: ${companyPendingUsers}`);
console.log(futureMeetings)


    return (
        <>
    <div id="dashboard-container">
      
      {/* <div className="charts-container">
      {numOfMentors && numOfUsers && numOfPendign && (<BiChart mentors={numOfMentors} users={numOfUsers} pending={numOfPendign}/>)}
            {skillsCount && <ColumnChart mapskills={skillsCount} />}
      </div> */}
        
    </div>
    </>
  );
}

export default AdminDashboard;
