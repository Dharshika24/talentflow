import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  ArrowRight,
  Building2,
  LayoutDashboard,
  FileText,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  UserRound,
  Plus,
} from "lucide-react";

import "./App.css";

const API = "https://talentflow-hsv0.onrender.com/api";

function HomePage({ onRecruiterLogin, onApply }) {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const loadJobs = async () => {
    try {
      const response = await fetch(`${API}/jobs`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Jobs error:", error);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = jobs
    .filter(
      (job) => (job.status || "Open").toLowerCase() === "open"
    )
    .filter((job) =>
      `${job.title || ""} ${job.department || ""} ${job.location || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <Building2 size={25} />
          <span>TalentFlow</span>
        </div>

        <div className="nav-links">
          <a href="#jobs">Find Jobs</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>

          <button className="ta-login" onClick={onRecruiterLogin}>
            Recruiter Login
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="badge">SMARTER RECRUITMENT</div>

          <h1>
            Find the right
            <br />
            <span>talent, faster.</span>
          </h1>

          <p>
            Discover opportunities and connect with companies
            looking for talented people like you.
          </p>

          <div className="search-box">
            <div className="search-field">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search jobs, skills or companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="search-button">Search Jobs</button>
          </div>
        </div>
      </section>

      <section className="jobs-section" id="jobs">
        <div className="section-heading">
          <div>
            <div className="section-label">OPPORTUNITIES</div>
            <h2>Latest Job Openings</h2>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="job-card">
            <div className="job-info">
              <h3>No jobs found</h3>
              <p>
                There are currently no job openings matching your search.
              </p>
            </div>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="job-icon">
                <Briefcase size={25} />
              </div>

              <div className="job-info">
                <div className="job-type">
                  {job.employment_type || "FULL-TIME"}
                </div>

                <h3>{job.title}</h3>

                <div className="job-details">
                  <span>
                    <Building2 size={15} />
                    {job.department || "General"}
                  </span>

                  <span>
                    <MapPin size={15} />
                    {job.location || "Not specified"}
                  </span>
                </div>

                <p>{job.description}</p>

                {job.requirements && (
                  <div className="skills">
                    {job.requirements
                      .split(",")
                      .slice(0, 5)
                      .map((skill, index) => (
                        <span key={index}>{skill.trim()}</span>
                      ))}
                  </div>
                )}
              </div>

              <button
                className="apply-button"
                onClick={() => onApply(job)}
              >
                Apply
                <ArrowRight size={16} />
              </button>
            </div>
          ))
        )}
      </section>

      <section className="about" id="about">
        <div className="section-label">ABOUT TALENTFLOW</div>

        <h2>Connecting great people with great opportunities.</h2>

        <p>
          TalentFlow helps organizations manage recruitment efficiently
          while giving candidates a simple way to discover and apply for
          the right opportunities.
        </p>
      </section>

      <footer id="contact">
        <div className="logo">
          <Building2 size={24} />
          <span>TalentFlow</span>
        </div>

        <p>Smart recruitment. Better hiring.</p>
      </footer>
    </div>
  );
}

function ApplicationForm({ job, onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    qualification: "",
    experience: "",
    skills: "",
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          job_id: job.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      setMessage("Application submitted successfully! 🎉");

      setForm({
        name: "",
        email: "",
        phone: "",
        location: "",
        qualification: "",
        experience: "",
        skills: "",
      });
    } catch (error) {
      console.error("Application error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <Building2 size={25} />
          <span>TalentFlow</span>
        </div>

        <button className="ta-login" onClick={onBack}>
          ← Back to Jobs
        </button>
      </nav>

      <section className="jobs-section">
        <div className="section-label">APPLICATION</div>

        <h2>Apply for {job.title}</h2>

        <p style={{ marginTop: "10px", color: "#697586" }}>
          {job.department || "General"} · {job.location}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            border: "1px solid #e4e9f0",
            borderRadius: "14px",
            padding: "30px",
            marginTop: "30px",
            maxWidth: "750px",
          }}
        >
          <div className="form-grid">
            <input
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <input
              name="location"
              placeholder="Current Location"
              value={form.location}
              onChange={handleChange}
            />

            <input
              name="qualification"
              placeholder="Highest Qualification"
              value={form.qualification}
              onChange={handleChange}
            />

            <input
              name="experience"
              placeholder="Experience (e.g. Fresher)"
              value={form.experience}
              onChange={handleChange}
            />

            <textarea
              name="skills"
              placeholder="Skills (e.g. React, JavaScript, SQL)"
              value={form.skills}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="search-button"
            disabled={submitting}
            style={{ marginTop: "20px" }}
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>

          {message && (
            <p
              style={{
                marginTop: "15px",
                color: message.includes("successfully")
                  ? "#29945c"
                  : "#d64545",
                fontWeight: "600",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}

function TADashboard({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    employment_type: "Full-time",
    description: "",
    requirements: "",
  });

  const loadJobs = async () => {
    try {
      const response = await fetch(`${API}/jobs`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Jobs error:", error);
    }
  };

  const loadApplications = async () => {
    try {
      const response = await fetch(`${API}/applications`);

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error("Applications error:", error);
    }
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
  }, []);

  const createJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }

      alert("Job created successfully!");

      setJobForm({
        title: "",
        department: "",
        location: "",
        employment_type: "Full-time",
        description: "",
        requirements: "",
      });

      await loadJobs();
      setPage("jobs");
    } catch (error) {
      console.error("Create job error:", error);
      alert(error.message);
    }
  };

  const updateJobStatus = async (jobId, status) => {
    try {
      const response = await fetch(`${API}/jobs/${jobId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update job");
      }

      setJobs((current) =>
        current.map((job) =>
          job.id === jobId
            ? { ...job, status }
            : job
        )
      );
    } catch (error) {
      console.error("Job status error:", error);
      alert(error.message);
    }
  };

  const updateStage = async (id, stage) => {
    try {
      const response = await fetch(
        `${API}/applications/${id}/stage`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stage }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update candidate"
        );
      }

      setApplications((current) =>
        current.map((candidate) =>
          candidate.id === id
            ? { ...candidate, stage }
            : candidate
        )
      );
    } catch (error) {
      console.error("Stage update error:", error);
      alert(error.message);
    }
  };

  const jobApplications = selectedJob
    ? applications.filter(
        (application) =>
          Number(application.job_id) === Number(selectedJob.id)
      )
    : applications;

  const applied = jobApplications.filter(
    (a) => (a.stage || "Applied").trim().toLowerCase() === "applied"
  ).length;

  const screening = jobApplications.filter(
    (a) => (a.stage || "").trim().toLowerCase() === "screening"
  ).length;

  const shortlisted = jobApplications.filter(
    (a) => (a.stage || "").trim().toLowerCase() === "shortlisted"
  ).length;

  const interviews = jobApplications.filter(
    (a) => (a.stage || "").trim().toLowerCase() === "interview"
  ).length;

  const selected = jobApplications.filter(
    (a) => (a.stage || "").trim().toLowerCase() === "selected"
  ).length;

  const rejected = jobApplications.filter(
    (a) => (a.stage || "").trim().toLowerCase() === "rejected"
  ).length;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="dashboard-logo">
          <Building2 size={24} />
          <span>TalentFlow</span>
        </div>

        <div className="sidebar-label">RECRUITMENT</div>

        <nav className="sidebar-nav">
          <button
            onClick={() => {
              setPage("dashboard");
              setSelectedJob(null);
            }}
            className={page === "dashboard" ? "active" : ""}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() => {
              setPage("jobs");
              setSelectedJob(null);
            }}
            className={page === "jobs" ? "active" : ""}
          >
            <Briefcase size={18} />
            Jobs
          </button>

          <button
            onClick={() => {
              setPage("candidates");
              setSelectedJob(null);
            }}
            className={page === "candidates" ? "active" : ""}
          >
            <Users size={18} />
            Candidates
          </button>

          <button
            onClick={() => {
              setPage("applications");
              setSelectedJob(null);
            }}
            className={page === "applications" ? "active" : ""}
          >
            <FileText size={18} />
            Applications
          </button>

          <button
            onClick={() => {
              setPage("interviews");
              setSelectedJob(null);
            }}
            className={page === "interviews" ? "active" : ""}
          >
            <CalendarDays size={18} />
            Interviews
          </button>

          <button
            onClick={() => {
              setPage("analytics");
              setSelectedJob(null);
            }}
            className={page === "analytics" ? "active" : ""}
          >
            <BarChart3 size={18} />
            Analytics
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => setPage("settings")}>
            <Settings size={18} />
            Settings
          </button>

          <button onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>

          <div className="recruiter-profile">
            <div className="avatar">HR</div>

            <div>
              <strong>HR Recruiter</strong>
              <small>Talent Acquisition</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">

        {/* DASHBOARD */}

        {page === "dashboard" && (
          <>
            <div className="dashboard-header">
              <div>
                <h1>Recruitment Dashboard</h1>
                <p>Overview of your hiring activity</p>
              </div>

              <div className="header-actions">
                <div className="dashboard-search">
                  <Search size={16} />
                  <input placeholder="Search..." />
                </div>

                <button className="icon-button">
                  <Bell size={17} />
                </button>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-top">
                  <span>Total Jobs</span>
                  <Briefcase size={17} />
                </div>

                <h2>{jobs.length}</h2>

                <p>Available positions</p>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Total Applications</span>
                  <Users size={17} />
                </div>

                <h2>{applications.length}</h2>

                <p>Current applications</p>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Shortlisted</span>
                  <UserRound size={17} />
                </div>

                <h2>{shortlisted}</h2>

                <p>Selected for next stage</p>
              </div>

              <div className="stat-card">
                <div className="stat-top">
                  <span>Interviews</span>
                  <CalendarDays size={17} />
                </div>

                <h2>{interviews}</h2>

                <p>Interview stage</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <div>
                    <h2>Recruitment Pipeline</h2>
                    <p>Candidate movement by stage</p>
                  </div>
                </div>

                <div className="pipeline">
                  <div className="pipeline-stage">
                    <span>Applied</span>
                    <strong>{applied}</strong>
                  </div>

                  <div className="pipeline-stage">
                    <span>Screening</span>
                    <strong>{screening}</strong>
                  </div>

                  <div className="pipeline-stage">
                    <span>Shortlisted</span>
                    <strong>{shortlisted}</strong>
                  </div>

                  <div className="pipeline-stage">
                    <span>Interview</span>
                    <strong>{interviews}</strong>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <div>
                    <h2>Active Jobs</h2>
                    <p>Current recruitment positions</p>
                  </div>
                </div>

                {jobs.length === 0 ? (
                  <p>No jobs created yet.</p>
                ) : (
                  jobs.slice(0, 3).map((job) => (
                    <div className="active-job" key={job.id}>
                      <div className="job-small-icon">
                        <Briefcase size={21} />
                      </div>

                      <div>
                        <h3>{job.title}</h3>

                        <p>
                          <MapPin size={13} />
                          {job.location}
                        </p>

                        <span className={job.status === "Closed" ? "status-closed" : "status-active"}>
                          ● {job.status || "Open"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="dashboard-card candidates-card">
              <div className="card-header">
                <div>
                  <h2>Recent Candidates</h2>
                  <p>Latest applications received</p>
                </div>

                <button
                  className="small-button"
                  onClick={() => setPage("candidates")}
                >
                  View All
                </button>
              </div>

              {applications.length === 0 ? (
                <div className="empty-candidates">
                  <Users size={28} />
                  <p>No candidates have applied yet.</p>
                </div>
              ) : (
                <div className="candidate-table">
                  <div className="table-header">
                    <span>Candidate</span>
                    <span>Job</span>
                    <span>Experience</span>
                    <span>Stage</span>
                  </div>

                  {applications.slice(0, 6).map((candidate) => (
                    <div
                      className="candidate-row"
                      key={candidate.id}
                    >
                      <div className="candidate-name">
                        <div className="candidate-avatar">
                          {candidate.name
                            ?.substring(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>{candidate.name}</strong>
                          <small>{candidate.email}</small>
                        </div>
                      </div>

                      <span>
                        {candidate.job_title || "—"}
                      </span>

                      <span>
                        {candidate.experience || "Fresher"}
                      </span>

                      <select
                        value={candidate.stage || "Applied"}
                        onChange={(e) =>
                          updateStage(
                            candidate.id,
                            e.target.value
                          )
                        }
                      >
                        <option>Applied</option>
                        <option>Screening</option>
                        <option>Shortlisted</option>
                        <option>Interview</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* JOBS */}

        {page === "jobs" && (
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h2>Jobs</h2>
                <p>Manage recruitment opportunities</p>
              </div>

              <button
                className="search-button"
                onClick={() => setPage("create-job")}
              >
                <Plus size={16} />
                Create New Job
              </button>
            </div>

            {jobs.length === 0 ? (
              <div className="empty-candidates">
                <Briefcase size={30} />
                <p>No jobs found.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  className="job-card"
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="job-icon">
                    <Briefcase size={24} />
                  </div>

                  <div className="job-info">
                    <div className="job-type">
                      {job.employment_type || "Full-time"}
                    </div>

                    <h3>{job.title}</h3>

                    <div className="job-details">
                      <span>
                        <Building2 size={15} />
                        {job.department || "General"}
                      </span>

                      <span>
                        <MapPin size={15} />
                        {job.location}
                      </span>
                    </div>

                    <p>{job.description}</p>

                    <div className="job-actions">
                      <span className={job.status === "Closed" ? "job-status closed" : "job-status open"}>
                        ● {job.status || "Open"}
                      </span>

                      {job.status === "Closed" ? (
                        <button
                          className="reopen-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateJobStatus(job.id, "Open");
                          }}
                        >
                          Reopen
                        </button>
                      ) : (
                        <button
                          className="close-job-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Close "${job.title}" vacancy?`)) {
                              updateJobStatus(job.id, "Closed");
                            }
                          }}
                        >
                          Close Vacancy
                        </button>
                      )}
                    </div>

                    <button
                      className="small-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                        setPage("applications");
                      }}
                    >
                      View Applications →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CREATE JOB */}

        {page === "create-job" && (
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h2>Create New Job</h2>
                <p>Publish a new recruitment opportunity</p>
              </div>

              <button
                className="small-button"
                onClick={() => setPage("jobs")}
              >
                ← Back
              </button>
            </div>

            <form className="job-form" onSubmit={createJob}>
              <input
                placeholder="Job Title *"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    title: e.target.value,
                  })
                }
                required
              />

              <input
                placeholder="Department"
                value={jobForm.department}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    department: e.target.value,
                  })
                }
              />

              <input
                placeholder="Location *"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    location: e.target.value,
                  })
                }
                required
              />

              <select
                value={jobForm.employment_type}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    employment_type: e.target.value,
                  })
                }
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>

              <textarea
                placeholder="Job Description *"
                rows="6"
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    description: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Requirements — React, SQL, Excel"
                rows="4"
                value={jobForm.requirements}
                onChange={(e) =>
                  setJobForm({
                    ...jobForm,
                    requirements: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="search-button"
              >
                Create Job
              </button>
            </form>
          </div>
        )}

        {/* CANDIDATES / PIPELINE */}

        {page === "candidates" && (
          <div>
            <div className="dashboard-header">
              <div>
                <h1>
                  {selectedJob
                    ? `${selectedJob.title} Pipeline`
                    : "Candidate Pipeline"}
                </h1>

                <p>
                  {selectedJob
                    ? `Manage candidates for ${selectedJob.title}`
                    : "Manage candidates across all jobs"}
                </p>
              </div>

              {selectedJob && (
                <button
                  className="small-button"
                  onClick={() => setPage("jobs")}
                >
                  ← Back to Jobs
                </button>
              )}
            </div>

            {/* JOB SELECTOR */}

            <div className="job-selector-card">
              <label>Select Job</label>

              <select
                value={selectedJob?.id || ""}
                onChange={(e) => {
                  const job = jobs.find(
                    (j) => j.id === Number(e.target.value)
                  );

                  setSelectedJob(job || null);
                }}
              >
                <option value="">All Jobs</option>

                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            {/* PIPELINE */}

            <div className="pipeline-board">

              {[
                "Applied",
                "Screening",
                "Shortlisted",
                "Interview",
                "Selected",
                "Rejected",
              ].map((stage) => {
                const stageCandidates = jobApplications.filter(
                  (candidate) =>
                    (candidate.stage || "Applied").trim().toLowerCase() ===
                    stage.toLowerCase()
                );

                return (
                  <div className="pipeline-column" key={stage}>

                    <div className="pipeline-column-header">
                      <div>
                        <strong>{stage}</strong>
                        <span>{stageCandidates.length}</span>
                      </div>
                    </div>

                    {stageCandidates.length === 0 ? (
                      <div className="pipeline-empty">
                        No candidates
                      </div>
                    ) : (
                      stageCandidates.map((candidate) => (
                        <div
                          className="pipeline-candidate"
                          key={candidate.id}
                        >
                          <div className="pipeline-candidate-top">

                            <div className="candidate-avatar">
                              {candidate.name
                                ?.substring(0, 2)
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {candidate.name}
                              </strong>

                              <small>
                                {candidate.email}
                              </small>
                            </div>

                          </div>

                          <div className="pipeline-details">
                            <span>
                              {candidate.experience ||
                                "Fresher"}
                            </span>

                            <span>
                              {candidate.qualification ||
                                "—"}
                            </span>
                          </div>

                          <select
                            value={candidate.stage || "Applied"}
                            onChange={(e) =>
                              updateStage(
                                candidate.id,
                                e.target.value
                              )
                            }
                          >
                            <option>Applied</option>
                            <option>Screening</option>
                            <option>Shortlisted</option>
                            <option>Interview</option>
                            <option>Selected</option>
                            <option>Rejected</option>
                          </select>
                        </div>
                      ))
                    )}

                  </div>
                );
              })}

            </div>
          </div>
        )}

        {/* APPLICATIONS */}

        {page === "applications" && (
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h2>
                  {selectedJob
                    ? `${selectedJob.title} Applications`
                    : "All Applications"}
                </h2>

                <p>
                  {selectedJob
                    ? `Applications received for ${selectedJob.title}`
                    : "All candidate applications"}
                </p>
              </div>

              <button
                className="small-button"
                onClick={() => setPage("jobs")}
              >
                ← Back to Jobs
              </button>
            </div>

            {selectedJob && (
              <div className="job-summary">
                <strong>{selectedJob.title}</strong>
                <span>
                  {selectedJob.department || "General"} ·{" "}
                  {selectedJob.location}
                </span>
              </div>
            )}

            <div className="application-stats">
              <div>
                <strong>{jobApplications.length}</strong>
                <span>Total</span>
              </div>

              <div>
                <strong>{applied}</strong>
                <span>Applied</span>
              </div>

              <div>
                <strong>{screening}</strong>
                <span>Screening</span>
              </div>

              <div>
                <strong>{shortlisted}</strong>
                <span>Shortlisted</span>
              </div>

              <div>
                <strong>{interviews}</strong>
                <span>Interview</span>
              </div>

              <div>
                <strong>{selected}</strong>
                <span>Selected</span>
              </div>
            </div>

            {jobApplications.length === 0 ? (
              <div className="empty-candidates">
                <FileText size={30} />
                <p>
                  No applications for this job yet.
                </p>
              </div>
            ) : (
              <div className="candidate-table">
                <div className="table-header">
                  <span>Candidate</span>
                  <span>Experience</span>
                  <span>Qualification</span>
                  <span>Stage</span>
                </div>

                {jobApplications.map((candidate) => (
                  <div
                    className="candidate-row"
                    key={candidate.id}
                  >
                    <div className="candidate-name">
                      <div className="candidate-avatar">
                        {candidate.name
                          ?.substring(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <strong>{candidate.name}</strong>
                        <small>{candidate.email}</small>
                      </div>
                    </div>

                    <span>
                      {candidate.experience || "Fresher"}
                    </span>

                    <span>
                      {candidate.qualification || "—"}
                    </span>

                    <select
                      value={candidate.stage || "Applied"}
                      onChange={(e) =>
                        updateStage(
                          candidate.id,
                          e.target.value
                        )
                      }
                    >
                      <option>Applied</option>
                      <option>Screening</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INTERVIEWS */}

        {page === "interviews" && (
          <div className="dashboard-card">
            <h2>Interviews</h2>

            <p style={{ marginTop: "10px" }}>
              Candidates currently in the interview stage:
            </p>

            {applications.filter(
              (a) => (a.stage || "").trim().toLowerCase() === "interview"
            ).length === 0 ? (
              <p style={{ marginTop: "20px" }}>
                No interviews yet.
              </p>
            ) : (
              applications
                .filter((a) => (a.stage || "").trim().toLowerCase() === "interview")
                .map((candidate) => (
                  <div
                    className="candidate-row"
                    key={candidate.id}
                  >
                    <strong>{candidate.name}</strong>
                    <span>{candidate.job_title}</span>
                    <span>{candidate.email}</span>
                  </div>
                ))
            )}
          </div>
        )}

        {/* ANALYTICS */}

        {page === "analytics" && (
          <div className="dashboard-card">
            <h2>Recruitment Analytics</h2>

            <p style={{ marginTop: "15px" }}>
              Total Jobs: <strong>{jobs.length}</strong>
            </p>

            <p>
              Total Applications:{" "}
              <strong>{applications.length}</strong>
            </p>

            <p>
              Screening: <strong>{screening}</strong>
            </p>

            <p>
              Shortlisted: <strong>{shortlisted}</strong>
            </p>

            <p>
              Interviews: <strong>{interviews}</strong>
            </p>

            <p>
              Selected:{" "}
              <strong>
                {
                  applications.filter(
                    (a) => (a.stage || "").trim().toLowerCase() === "selected"
                  ).length
                }
              </strong>
            </p>

            <p>
              Rejected:{" "}
              <strong>
                {
                  applications.filter(
                    (a) => (a.stage || "").trim().toLowerCase() === "rejected"
                  ).length
                }
              </strong>
            </p>
          </div>
        )}

        {/* SETTINGS */}

        {page === "settings" && (
          <div className="dashboard-card">
            <h2>Settings</h2>
            <p style={{ marginTop: "10px" }}>
              TalentFlow recruiter settings will be available here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [selectedJob, setSelectedJob] = useState(null);

  if (page === "dashboard") {
    return (
      <TADashboard
        onLogout={() => {
          setSelectedJob(null);
          setPage("home");
        }}
      />
    );
  }

  if (page === "apply" && selectedJob) {
    return (
      <ApplicationForm
        job={selectedJob}
        onBack={() => setPage("home")}
      />
    );
  }

  return (
    <HomePage
      onRecruiterLogin={() => setPage("dashboard")}
      onApply={(job) => {
        setSelectedJob(job);
        setPage("apply");
      }}
    />
  );
}

export default App;