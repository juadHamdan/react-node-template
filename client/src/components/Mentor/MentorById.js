import axios from "axios";
import { useEffect, useState } from "react";
import MentorPage from "./MentorPage";
function MentorById(props) {
  const [mentor, setMentor] = useState([]);
  useEffect(() => {
    axios
      .get(`/mentor/${props.mentorId}`)
      .then((response) => {
        setMentor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return mentor.map((MentorById) => <MentorPage mentor={MentorById} />);
}

export default MentorById;
