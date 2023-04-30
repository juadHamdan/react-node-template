import { DEFAULT_USER_PICTURE } from "../../Constants"
import "./MentorTable.css"
const MenteesTable = ({ mentees }) => {
    return (
        <table className="company-data-table">
            <tr>
                <td className="header">Picture</td>
                <td className="header">Full Name</td>
                <td className="header">Email</td>
            </tr>
            {mentees.map(mentee => {
                return (
                    <tr>
                        <td> <img src={mentee.picture || DEFAULT_USER_PICTURE} /></td>
                        <td>{mentee.firstName} {mentee.lastName}</td>
                        <td>{mentee.email}</td>
                    </tr>
                )
            })}
        </table>
    )
}

export default MenteesTable