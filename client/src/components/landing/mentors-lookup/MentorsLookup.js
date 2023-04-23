import "./mentors-lookup.css";
import { useEffect, useState } from "react";
import { fetchFeaturedMentors, fetchMentorsBySkill } from "../../../MentorsApi";
import SkillsSearchInput from "./SkillsSearchInput";
import NamesSearch from "./NamesSearch";
import MentorCard from '../../mentors/mentor-card/MentorCard'
import Autocomplete from '@mui/material/Autocomplete';
import { skills } from '../../../skills-dataset'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const MentorsLookup = () => {
  const [skillNameInput, setSkillNameInput] = useState("");
  const [searchedMentors, setSearchedMentors] = useState([]);
  const [featuredMentors, setFeaturedMentors] = useState([]);

  useEffect(() => {
    const getFeaturedMentors = async () => {
      const mentors = await fetchFeaturedMentors();
      setFeaturedMentors(mentors);
    };
    getFeaturedMentors();
  }, []);

  const getSearchedMentorsBySkill = async (skill) => {
    setSkillNameInput(skill)
    const mentors = await fetchMentorsBySkill(skill);
    setSearchedMentors(mentors);
  };

  return (
    <div id="mentors-lookup-container">
      <div className="form-container">
        <h3>Look For A Mentor:</h3>
        <div className="form">
          <div className="skill-form-container">
            <SkillsSearchInput onAddSkillName={getSearchedMentorsBySkill} />
          </div>
          <div className="name-form-container">
            <NamesSearch />
          </div>
        </div>
      </div>



      <div className="mentors-cards-container">
        {searchedMentors.length === 0 ?
          <>
            <p className="title">Our Featured Mentors:</p>
            <div className="gradient-container"></div>
            <div className="mentors-cards">
              {featuredMentors && featuredMentors.map(featuredMentor =>
                <MentorCard key={featuredMentor._id} mentor={featuredMentor} />
              )}
            </div>
          </>
          :
          <>
            <p className="title">Our {skillNameInput} Mentors:</p>
            <div className="gradient-container"></div>
            <div className="mentors-cards">
              {searchedMentors.map((mentor) => (
                <MentorCard key={mentor._id} mentor={mentor} isHorizontalView={true} />
              ))}
            </div>
          </>
        }


      </div>
    </div>
  );
};

export default MentorsLookup;