import './landing.css'
import About from './about/About';
import MentorsLookup from './mentors-lookup/MentorsLookup';

const Landing = () => {
  return (
    <div id="landing-container">
      <div className="about-container">
        <About/>
      </div>
      <div className="mentors-lookup-container">
        <MentorsLookup/>
      </div>
    </div>
  )
}

export default Landing