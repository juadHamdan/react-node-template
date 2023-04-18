import './mentor.css'

function Mentor({ mentor }) {
    return (
        <div id="mentor">
            <div>
                {mentor.user.firstName} {mentor.user.lastName}
            </div>
        </div>
    )
}

export default Mentor