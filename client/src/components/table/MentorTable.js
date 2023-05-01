import { DEFAULT_USER_PICTURE } from "../../Constants"
import "./MentorTable.css"
import { useNavigate } from "react-router-dom";
import { fetchMentorByUserId } from "../../MentorsApi"
const MentorsTable = ({ mentors }) => {
    const navigate = useNavigate();

    const goToMentorPage = async (mentorID) => {
        let user = await fetchMentorByUserId(mentorID);
        navigate(`/mentors/${user._id}`);
    }
    return (
        <table className="company-data-table">
            <tr>
                <td className="header">Page</td>
                <td className="header">Picture</td>
                <td className="header">Full Name</td>
                <td className="header">Email</td>
            </tr>
            {mentors.map(mentor => {
                return (
                    <tr>
                        <td><button className="mentor-page-btn" onClick={() => goToMentorPage(mentor._id)}>Mentor Page</button></td>
                        <td> <img src={mentor.picture || DEFAULT_USER_PICTURE} /></td>
                        <td>{mentor.firstName} {mentor.lastName}</td>
                        <td>{mentor.email}</td>
                    </tr>
                )
            })}
        </table>
    )
}

export default MentorsTable