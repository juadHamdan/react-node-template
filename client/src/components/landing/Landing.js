import './landing.css'
import About from './about/About';
import MentorsLookup from './mentors-lookup/MentorsLookup';

const Landing = () => {
  return (
    <div id="landing-container">
        <About/>
        <MentorsLookup/>
    </div>
  )
}

export default Landing