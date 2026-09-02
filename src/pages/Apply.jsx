import { BriefcaseBusiness, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

function Apply() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const candidate = {
    id: Date.now(),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    qualification: formData.get("qualification"),
    experience: formData.get("experience"),
    skills: formData.get("skills"),
    job: "Software Developer",
    stage: "Applied",
    appliedDate: new Date().toLocaleDateString(),
  };

  const existingCandidates =
    JSON.parse(localStorage.getItem("candidates")) || [];

  existingCandidates.push(candidate);

  localStorage.setItem(
    "candidates",
    JSON.stringify(existingCandidates)
  );

  setSubmitted(true);
};

  if (submitted) {
    return (
      <div className="success-page">

        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Application Submitted!</h1>

          <p>
            Thank you for applying for the Software Developer position.
            Our recruitment team will review your application.
          </p>

          <Link to="/" className="main-apply-button">
            Back to Jobs
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="page">

      <nav className="navbar">

        <Link to="/" className="logo">
          <BriefcaseBusiness size={24} />
          <span>TalentFlow</span>
        </Link>

        <Link to="/" className="back-link">
          <ArrowLeft size={17} />
          Back
        </Link>

      </nav>

      <main className="application-container">

        <div className="application-header">

          <span className="section-label">
            JOB APPLICATION
          </span>

          <h1>Software Developer</h1>

          <p>
            Chennai · Full-time · ₹60,000/month
          </p>

        </div>

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >

          <h2>Personal Information</h2>

          <div className="form-grid">

            <div className="form-group">
              <label>Full Name *</label>
              <input
  name="name"
  required
  placeholder="Enter your full name"
/>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
  name="email"
  required
  type="email"
  placeholder="you@example.com"
/>
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
  name="phone"
  required
  type="tel"
  placeholder="+91 XXXXX XXXXX"
/>
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
  name="location"
  required
  placeholder="City"
/>
            </div>

          </div>

          <h2>Professional Information</h2>

          <div className="form-grid">

            <div className="form-group">
              <label>Highest Qualification *</label>

              <select name="qualification" required>
  <option value="">Select qualification</option>
  <option>B.Sc</option>
  <option>BCA</option>
  <option>B.E</option>
  <option>B.Tech</option>
  <option>MCA</option>
  <option>M.Sc</option>
  <option>Other</option>
</select>

            </div>

            <div className="form-group">
              <label>Experience</label>

              
              <select name="experience">
  <option>Fresher</option>
  <option>0–1 years</option>
  <option>1–2 years</option>
  <option>2+ years</option>
</select>

            </div>

          </div>

          <div className="form-group full">
            <label>Technical Skills *</label>

            <textarea
  name="skills"
  required
  rows="4"
  placeholder="Example: React, Node.js, Java, Python, SQL..."
/>

          </div>

          <div className="form-group full">
            <label>Resume *</label>

            <input
              required
              type="file"
              accept=".pdf,.doc,.docx"
            />

            <small>
              Accepted formats: PDF, DOC, DOCX
            </small>

          </div>

          <button
            type="submit"
            className="submit-application"
          >
            Submit Application
          </button>

        </form>

      </main>

    </div>
  );
}

export default Apply;