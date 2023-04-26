import Rating from '@mui/material/Rating';
import "./Review.css"
import { DEFAULT_USER_PICTURE } from "../../../Constants"
function Review({ review }) {
    return (<div className="review-box">
        <img className='profile-of-review-writer' src={review.picture || DEFAULT_USER_PICTURE}></img>
        <span className='writer-name'>{review.fullName}</span>
        <Rating className='rating-icon' name="read-only" value={review.rating} size="small" readOnly />
        <p className='description'>{review.description}</p>
    </div>)
}

export default Review