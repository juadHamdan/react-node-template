import { addReview } from "../../MeetingsApi"
import { useState } from "react";
import "./ReviewForm.css"

const ReviewForm = ({ meetingId }) => {
    const [review, setReview] = useState({ rating: 3, description: "" });
    const handleChange = (event) => setReview({ ...review, [event.target.name]: event.target.value });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addReview(meetingId, review);
        alert("review added successfully.")
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            Rating :<input type="number" min="0" max="5" onChange={handleChange} name="rating"></input>
            Review : <textarea required name="description" onChange={handleChange}></textarea>
            <button type="submit">save</button>
        </form>)
}

export default ReviewForm