import './about.css'

const About = () => {
    return (
        <div id="about-container">
            <h1 className="about-header">
                "Alone we can do so little, together we can do so much."
                <br /> - Helen Keller
            </h1>
            <h2 className="about-title-header">Why Hook A Mentor?</h2>
            <p className="about-text">
                Our website is designed to connect individuals who are seeking guidance and mentorship with skilled individuals.
                <hr />
                Our website allows users to search for mentors based on skills.
                Users can view the profiles of potential mentors, read their bios and reviews,
                and select the mentor that best fits their needs.
                Once a mentor is selected, users can connect with them directly through our platform to schedule sessions, ask questions, and receive guidance.
                <br />
            </p>
        </div>
    )
}

export default About