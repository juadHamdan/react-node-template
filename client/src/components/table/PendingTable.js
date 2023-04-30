import { DEFAULT_USER_PICTURE } from "../../Constants"
import "./MentorTable.css"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
const PendingTable = ({ companyPendingUsers, onApproveUser, onRejectUser }) => {
    return (
        <table className="company-data-table">
            <tr>
                <td className="header">Action</td>
                <td className="header">Picture</td>
                <td className="header">Full Name</td>
                <td className="header">Email</td>
            </tr>
            {companyPendingUsers.map((pendingUser, index) => {
                return (
                    <tr>
                        <td>
                            <ThumbUpAltIcon className="approve-icon" onClick={() => onApproveUser(pendingUser._id, index)} />
                            <ThumbDownAltIcon className="reject-icon" onClick={() => onRejectUser(pendingUser._id, index)} />
                        </td>
                        <td><img src={pendingUser.picture || DEFAULT_USER_PICTURE} /></td>
                        <td>{pendingUser.firstName} {pendingUser.lastName}</td>
                        <td>{pendingUser.email}</td>
                    </tr>
                )
            })}
        </table>
    )
}

export default PendingTable