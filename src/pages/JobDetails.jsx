import {
  BriefcaseBusiness,
  MapPin,
  Clock3,
  ArrowLeft,
  CheckCircle2
} from "lucide-react";

import { Link } from "react-router-dom";

function JobDetails() {
  return (
    <div className="page">

      {/* Navbar */}
      <nav className="navbar">

        <Link to="/" className="logo">
          <BriefcaseBusiness size={24} />
          <span>TalentFlow</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Jobs</Link>
          <Link to="/ta" className="ta-login">
            TA Portal
          </Link>
        </div>

      </nav>

      {/* Job Header */}
      <section className="job-header">

        <Link to="/" className="back-link">
          <ArrowLeft size={17} />
          Back to jobs
        </Link>

        <div className="job-header-content">

          <div className="large-job-icon">
            <BriefcaseBusiness size={32} />
          </div>

          <div>

            <span className="job-type">
              FULL-TIME
            </span>

            <h1>Software Developer</h1>

            <div className="job-details">

              <span>
                <MapPin size={17} />
                Chennai
              </span>

              <span>
                <Clock3 size={17} />
                Full-time
              </span>

              <span>
                ₹60,000 / month
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* Job Content */}
      <main className="job-detail-container">

        <div className="job-description">

          <h2>About the role</h2>

          <p>
            We are looking for a Software Developer who understands
            software engineering principles and can contribute to the
            complete software development lifecycle.
          </p>

          <h2>Responsibilities</h2>

          <ul>
            <li>Develop software applications from scratch.</li>
            <li>Understand and follow the SDLC process.</li>
            <li>Work with Agile development methodologies.</li>
            <li>Analyze and document software requirements.</li>
            <li>Collaborate with developers and other teams.</li>
            <li>Maintain and improve existing software.</li>
            <li>Participate in testing and troubleshooting.</li>
          </ul>

          <h2>Required skills</h2>

          <ul className="check-list">

            <li>
              <CheckCircle2 size={18} />
              Understanding of SDLC
            </li>

            <li>
              <CheckCircle2 size={18} />
              Software Engineering concepts
            </li>

            <li>
              <CheckCircle2 size={18} />
              Agile methodology
            </li>

            <li>
              <CheckCircle2 size={18} />
              Full-stack development knowledge
            </li>

            <li>
              <CheckCircle2 size={18} />
              Requirement analysis
            </li>

            <li>
              <CheckCircle2 size={18} />
              Teamwork and collaboration
            </li>

          </ul>

          <h2>Education</h2>

          <p>
            Any graduate with proven knowledge of software development
            and software engineering concepts.
          </p>

        </div>

        {/* Apply Card */}
        <aside className="apply-card">

          <h3>Interested in this role?</h3>

          <p>
            Take the next step in your career and apply for this
            position.
          </p>

          <Link
            to="/apply/software-developer"
            className="main-apply-button"
          >
            Apply Now
          </Link>

          <div className="apply-info">
            <span>📍 Chennai</span>
            <span>💼 Full-time</span>
            <span>💰 ₹60,000 / month</span>
          </div>

        </aside>

      </main>

    </div>
  );
}

export default JobDetails;