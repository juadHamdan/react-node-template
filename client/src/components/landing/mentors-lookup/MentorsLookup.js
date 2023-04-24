import "./mentors-lookup.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMentors, fetchMentorsBySkill } from "../../../MentorsApi";
import SkillsSearchInput from "./SkillsSearchInput";
import Mentors from "../../Mentors/Mentors";
import LaunchIcon from "@mui/icons-material/Launch";
import NamesSearch from "./NamesSearch";

const MentorsLookup = () => {
  const [skillNameInput, setSkillNameInput] = useState("");
  const [searchedMentors, setSearchedMentors] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const getMentors = async () => {
      const mentors = await fetchMentors();
      setMentors(mentors);
    };
    getMentors();
  }, []);

  const getSearchedMentorsBySkill = async (skill) => {
    setSkillNameInput(skill);
    const mentors = await fetchMentorsBySkill(skill);
    setSearchedMentors(mentors);
  };

  return (
    <div id="mentors-lookup-container">
      <div className="search-mentors">
        <h3>Look For A Mentor:</h3>
        <SkillsSearchInput onAddSkillName={getSearchedMentorsBySkill} />
        <NamesSearch />
        {searchedMentors.length === 0 ? null : (
          <div className="menu">
            <h3 className="menu-title">Our {skillNameInput} Mentors:</h3>
            {searchedMentors.map((mentor) => (
              <Link key={mentor._id} to={`/mentors/${mentor._id}`}>
                <div className="menu-item">
                  <p>
                    {mentor.user.firstName} {mentor.user.lastName}
                  </p>
                  <LaunchIcon />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {searchedMentors.length === 0 && (
        <>
          <h3>Featured Mentors:</h3>
          {mentors && <Mentors mentors={mentors} />}
        </>
      )}
    </div>
  );
};

export default MentorsLookup;
