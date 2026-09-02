import { BriefcaseBusiness, Search, MapPin, Clock3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <BriefcaseBusiness size={24} />
          <span>TalentFlow</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Jobs</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <Link to="/ta" className="ta-login">
            TA Portal
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">

          <span className="badge">
            CAREERS AT TALENTFLOW
          </span>

          <h1>
            Find your next
            <span> opportunity.</span>
          </h1>

          <p>
            Explore exciting career opportunities and take the next step
            toward building your future.
          </p>

          <div className="search-box">

            <div className="search-field">
              <Search size={20} />
              <input placeholder="Job title or keyword" />
            </div>

            <div className="search-field">
              <MapPin size={20} />
              <input placeholder="Location" />
            </div>

            <button className="search-button">
              Search Jobs
            </button>

          </div>
        </div>
      </section>

      {/* Jobs */}
      <section className="jobs-section" id="jobs">

        <div className="section-heading">

          <div>
            <span className="section-label">
              OPEN POSITIONS
            </span>

            <h2>Featured opportunities</h2>
          </div>

          <button className="view-all">
            View all jobs <ArrowRight size={17} />
          </button>

        </div>

        {/* Software Developer */}
        <div className="job-card">

          <div className="job-icon">
            <BriefcaseBusiness size={26} />
          </div>

          <div className="job-info">

            <span className="job-type">
              FULL-TIME
            </span>

            <h3>
              Software Developer
            </h3>

            <div className="job-details">

              <span>
                <MapPin size={16} />
                Chennai
              </span>

              <span>
                <Clock3 size={16} />
                Full-time
              </span>

              <span>
                ₹60,000 / month
              </span>

            </div>

            <p>
              Build and maintain software applications while working with
              modern development practices including SDLC, Agile and
              full-stack development.
            </p>

            <div className="skills">
              <span>SDLC</span>
              <span>Agile</span>
              <span>Full Stack</span>
              <span>Software Engineering</span>
            </div>

          </div>

          <Link
            to="/jobs/software-developer"
            className="apply-button"
          >
            View Job <ArrowRight size={17} />
          </Link>

        </div>

      </section>

      {/* About */}
      <section className="about" id="about">

        <span className="section-label">
          ABOUT TALENTFLOW
        </span>

        <h2>
          Connecting talent with opportunity.
        </h2>

        <p>
          TalentFlow is a recruitment platform designed to connect talented
          professionals with growing teams while helping recruiters manage
          the entire hiring journey.
        </p>

      </section>

      {/* Footer */}
      <footer id="contact">

        <div className="logo">
          <BriefcaseBusiness size={21} />
          TalentFlow
        </div>

        <p>
          Talent Acquisition & Recruitment Platform
        </p>

      </footer>

    </div>
  );
}

export default Home;